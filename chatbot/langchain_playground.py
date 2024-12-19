from langchain_ollama import ChatOllama
from langchain_core.messages import ToolMessage, BaseMessage
from langchain_core.tools import tool
import os
import json
from textblob import TextBlob
import re

# Load secrets for LangSmith API key
secrets = json.load(open("secret.json"))

os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_ENDPOINT"] = "https://api.smith.langchain.com"
os.environ["LANGCHAIN_API_KEY"] = secrets.get("langsmith_api_key")
os.environ["LANGCHAIN_PROJECT"] = "patient_data_retrieval"

# Patient data in the database
patients = {
    "John Doe": {
        "age": 45,
        "address": "123 Elm Street",
        "medical_condition": "Hypertension",
        "email": "john.doe@example.com"
    },
    "Jane Smith": {
        "age": 37,
        "address": "456 Maple Avenue",
        "medical_condition": "Type 2 Diabetes",
        "email": "jane.smith@example.com"
    },
    "Sam Brown": {
        "age": 29,
        "address": "789 Pine Road",
        "medical_condition": "Asthma",
        "email": "sam.brown@example.com"
    },
}

@tool
def get_patient_info(name: str, info_key: str):
    """Retrieve specific information about a patient.

    Args:
        name (str): The full name of the patient.
        info_key (str): The type of information to retrieve (e.g., 'age', 'address', 'medical_condition').

    Use this tool when a doctor requests details about a patient.
    """
    print(f"Debug: get_patient_info called with name = '{name}', info_key = '{info_key}'")
    patient_data = patients.get(name)
    if not patient_data:
        return f"Patient '{name}' not found in the database."
    return patient_data.get(info_key, f"Information '{info_key}' not found for patient '{name}'.")


@tool
def get_patient_age(name: str):
    """Retrieve the age of a patient.

    Args:
        name (str): The full name of the patient.

    Use this tool when a doctor asks for a patient's age.
    """
    return get_patient_info.invoke({"name": name, "info_key": "age"})


@tool
def get_patient_address(name: str):
    """Retrieve the address of a patient.

    Args:
        name (str): The full name of the patient.

    Returns:
        str: The patient's address, or a message if the patient is not found.
    """
    return get_patient_info.invoke({"name": name, "info_key": "address"})

@tool
def get_patient_email(name: str):
    """Retrieve the email of a patient.

    Args:
        name (str): The full name of the patient.

    Returns:
        str: The patient's email, or a message if the patient is not found.
    """
    return get_patient_info.invoke({"name": name, "info_key": "email"})


@tool
def get_all_patient_data(name: str):
    """Retrieve all available data for a patient, including age, address, and medical condition.

    Args:
        name (str): The full name of the patient.

    Returns:
        dict: A dictionary containing the patient's full information, or a message if the patient is not found.
    """
    if name in patients:
        patient_data = patients[name]
        return patient_data
    else:
        return f"Patient '{name}' not found in the database."

def is_generic_response(user_input):
    blob = TextBlob(user_input)
    sentiment = blob.sentiment.polarity
    return sentiment >= 0.5  # Threshold for positive or neutral sentiment


# Initialize the LLM with tools
llm = ChatOllama(model="llama3.2:3b", temperature=0).bind_tools([
    get_patient_info, 
    get_patient_age, 
    get_all_patient_data,
    get_patient_address,
    get_patient_email
])


# System prompt for context
conversation = [
    (
        "system",
        """
        You are an assistant that helps doctors retrieve patient information such as age, address, email, and medical condition.

        Use the following tools to fetch patient information:
        - `get_patient_info`: To get specific details like medical condition.
        - `get_patient_age`: To get the patient's age.
        - `get_all_patient_data`: To retrieve all available information about a patient.
        - `get_patient_address`: To get the patient's address.
        - `get_patient_email`: To get the patient's email.

        Examples of how you should use the tools:
        - "What is John Smith's address?" -> Call `get_patient_address` with `name='John Smith'`.
        - "Give me Thomas Smith's email." -> Call `get_patient_email` with `name='Thomas Smith'`.
        - "How old is Steve Jobs?" -> Call `get_patient_age` with `name='Steve Jobs'`.
        - "Give me all information on Bill Gates." -> Call `get_all_patient_data` with `name='Bill Gates'`.

        If the user asks for **all information** about a patient, use the `get_all_patient_data` tool.

        Respond professionally and concisely, presenting the data naturally without mentioning tool calls.
        Only use the tools if the user is asking for patient details. If the user message is not relavent to patient data
        respond with: ("I am a doctor's assistant, please state your medical inquiry")
        """
    )
]

# Function to handle tool calls
def handle_tool_calls(llm_response: BaseMessage, conversation_list: list[tuple[str, str]]):
    tool_result = None  # Initialize tool_result to None

    if llm_response.tool_calls:
        for tool_call in llm_response.tool_calls:
            tool_name = tool_call['name']
            tool_args = tool_call['args']

            if tool_name == 'get_all_patient_data':
                tool_result = get_all_patient_data.invoke(tool_args)
            elif tool_name == 'get_patient_info':
                tool_result = get_patient_info.invoke(tool_args)
            elif tool_name == 'get_patient_age':
                tool_result = get_patient_age.invoke(tool_args)
            elif tool_name == 'get_patient_address':
                tool_result = get_patient_address.invoke(tool_args)
            elif tool_name == 'get_patient_email':
                tool_result = get_patient_email.invoke(tool_args)
            else:
                print(f"Debug: Unknown tool call - {tool_name}")
                tool_result = "Hi! I am a doctor's assistant, please state your medical inquiry."

            # Append the tool result to the conversation if it's not None
            if tool_result is not None:
                conversation_list.append(
                    ToolMessage(content=str(tool_result), tool_call_id=tool_call['id'])
                )
                print(f"Debug: Appended tool result to conversation: {tool_result}")
                return tool_result
            else:
                print("Debug: Tool result is None")

    return llm_response

def is_generic_response(user_input):
    """Check if the user input is a polite or generic response."""
    polite_patterns = [
        r"\bthanks?\b",
        r"\bthank you\b",
        r"\ball good\b",
        r"\bokay\b",
        r"\bok\b",
        r"\bno problem\b",
        r"\byou're welcome\b",
        r"\bfine\b",
        r"\bgreat\b"
    ]
    pattern = re.compile("|".join(polite_patterns), re.IGNORECASE)
    return bool(pattern.search(user_input))

def is_medical_inquiry(user_input):
    """Check if the input is a medical inquiry based on keywords."""
    medical_keywords = [
        "age", "address", "email", "medical condition", "patient", "info", "information", "data"
    ]
    pattern = re.compile("|".join(medical_keywords), re.IGNORECASE)
    return bool(pattern.search(user_input))

user_input = input("Ask a question: ")
while user_input.lower() != "exit":
    if is_generic_response(user_input):
        print("\nFinal Response:")
        print("Glad to be helpful! Let me know if you have any more medical inquiries.")
        conversation = [conversation[0]]  # Reset conversation history
    elif not is_medical_inquiry(user_input):
        print("\nFinal Response:")
        print("Hi! I am a doctor's assistant, and I can only help with medical inquiries.")
        conversation = [conversation[0]]  # Reset conversation history
    else:
        conversation.append(("human", user_input))

        # Keep system prompt and the latest interaction
        MAX_CONVERSATION_HISTORY = 3
        conversation = [conversation[0]] + conversation[-MAX_CONVERSATION_HISTORY:]

        # Get the response
        response = llm.invoke(conversation)

        # Check if the response includes tool calls
        if response.tool_calls:
            final_response = handle_tool_calls(response, conversation)
            if isinstance(final_response, (str, int, dict)):
                print("\nFinal Response:")
                print(final_response)
            else:
                print("\nFinal Response:")
                print(final_response.content)
        else:
            # Fallback response for non-tool related queries
            print("\nFinal Response:")
            print("I am a doctor's assistant, please state your medical inquiry.")

    user_input = input("\nAsk another question: ")

print("Goodbye!")
