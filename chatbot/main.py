from langchain_ollama import ChatOllama
from langchain_core.messages import ToolMessage, BaseMessage
from appointment_manager import get_current_appointments, delete_appointment, reschedule_appointment
import os
import json
import re
from datetime import datetime

# Load secrets and initialize the LLM
secrets = json.load(open("secret.json"))
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_ENDPOINT"] = "https://api.smith.langchain.com"
os.environ["LANGCHAIN_API_KEY"] = secrets.get("langsmith_api_key")
os.environ["LANGCHAIN_PROJECT"] = "appointment_management"
llm = ChatOllama(model="llama3.2:3b", temperature=0).bind_tools([
    get_current_appointments,
    delete_appointment,
    reschedule_appointment
])

# System prompt for context
conversation = [
    (
        "system",
        """
        You are a helpful assistant for managing appointments. Use the following tools:

        - **reschedule_appointment**: To change the date or time of an appointment.
        - **get_current_appointments**: To list all current appointments.
        - **delete_appointment**: To cancel an appointment.
        """
    )
]

def handle_tool_calls(llm_response: BaseMessage, conversation_list: list[tuple[str, str]]):
    if llm_response.tool_calls:
        for tool_call in llm_response.tool_calls:
            tool_name = tool_call['name']
            tool_args = tool_call['args']

            if tool_name == 'get_current_appointments':
                appointments = get_current_appointments.invoke({})
                tool_result = format_appointments(appointments)
            elif tool_name == 'reschedule_appointment':
                tool_result = reschedule_appointment.invoke(tool_args)
            elif tool_name == 'delete_appointment':
                tool_result = delete_appointment.invoke(tool_args)
            else:
                tool_result = "I'm sorry, I didn't understand your request. Please state your medical inquiry clearly."

            conversation_list.append(ToolMessage(content=str(tool_result), tool_call_id=tool_call['id']))
            return tool_result

    return llm_response

def find_appointment(first_name, last_name, health_card, doctor):
    # Clean the input doctor's name by removing 'Dr. ' and extra spaces
    doctor_cleaned = doctor.replace("Dr. ", "").strip().lower()
    
    current_appointments = get_current_appointments.invoke({})
    for appointment in current_appointments:
        patient = appointment.get('patient', {})
        doctor_name = f"{appointment.get('doctor', {}).get('firstName', '')} {appointment.get('doctor', {}).get('lastName', '')}".lower()

        if (
            patient.get('firstName', '').lower() == first_name.lower() and
            patient.get('lastName', '').lower() == last_name.lower() and
            patient.get('healthCardNumber', '') == health_card and
            doctor_name == doctor_cleaned
        ):
            return appointment

    print("No matching appointment found.") 
    return None


def format_appointments(appointments):
    if not appointments:
        return "No appointments found."

    formatted_appointments = []
    for appointment in appointments:
        patient = appointment.get('patient', {})
        doctor = appointment.get('doctor', {})
        date_time = appointment.get('dateTime')
        if date_time:
            date_time = datetime.fromisoformat(date_time.replace('Z', '+00:00'))
            formatted_date = date_time.strftime("%Y-%m-%d")
            formatted_time = date_time.strftime("%I:%M %p")
            formatted_appointments.append(
                f"- {patient.get('firstName')} {patient.get('lastName')} with Dr. {doctor.get('firstName')} {doctor.get('lastName')} on {formatted_date} at {formatted_time}"
            )
        else:
            formatted_appointments.append(
                f"- {patient.get('firstName')} {patient.get('lastName')} with Dr. {doctor.get('firstName')} {doctor.get('lastName')} (Date not available)"
            )

    return "Current appointments:\n" + "\n".join(formatted_appointments)

def get_user_input(prompt):
    return input(prompt)

def main():
    print("Welcome to the Appointment Manager Chatbot!")
    while True:
        user_input = get_user_input("What would you like to do? (cancel/reschedule/check/exit): ")
        if user_input.lower() == "cancel":
            first_name = get_user_input("Please enter your first name: ")
            last_name = get_user_input("Please enter your last name: ")
            health_card = get_user_input("Please enter your health card number: ")
            doctor = get_user_input("Please enter the doctor's name: ")

            appointment = find_appointment(first_name, last_name, health_card, doctor)
            if appointment:
                delete_response = delete_appointment.invoke({
                "name": f"{first_name} {last_name}",
                "health_card": health_card,
                "doctor_name": doctor
            })
                print(delete_response)
            else:
                print("No matching appointment found.")
        elif user_input.lower() == "reschedule":
            first_name = get_user_input("Please enter your first name: ")
            last_name = get_user_input("Please enter your last name: ")
            health_card = get_user_input("Please enter your health card number: ")
            doctor = get_user_input("Please enter the doctor's name: ")

            appointment = find_appointment(first_name, last_name, health_card, doctor)
            if appointment:
                print("Current appointment details:")
                date_time = appointment.get('dateTime')
                if date_time:
                    date_time = datetime.fromisoformat(date_time.replace('Z', '+00:00'))
                    formatted_date = date_time.strftime("%Y-%m-%d")
                    formatted_time = date_time.strftime("%I:%M %p")
                    print(f"Date: {formatted_date}")
                    print(f"Time: {formatted_time}")
                else:
                    print("Date and time not available")

                new_date = get_user_input("Please enter the new date (YYYY-MM-DD): ")
                new_time = get_user_input("Please enter the new time (HH:MM AM/PM): ")

                new_datetime = datetime.strptime(f"{new_date} {new_time}", "%Y-%m-%d %I:%M %p")
                new_date_formatted = new_datetime.strftime("%Y-%m-%d")
                new_time_formatted = new_datetime.strftime("%H:%M:%S")

                reschedule_response = reschedule_appointment.invoke({
                    "id": appointment.get('id'),
                    "name": f"{first_name} {last_name}",
                    "health_card": health_card,
                    "doctor_name": doctor,
                    "new_date": new_date_formatted,
                    "new_time": new_time_formatted
                })
                print(reschedule_response)
        elif user_input.lower() == "check":
            appointments = get_current_appointments.invoke({})
            print(format_appointments(appointments))
        elif user_input.lower() == "exit":
            print("Thank you for using the Appointment Manager Chatbot. Goodbye!")
            break
        else:
            print("Invalid option. Please enter 'cancel', 'reschedule', 'check', or 'exit'.")

if __name__ == "__main__":
    main()