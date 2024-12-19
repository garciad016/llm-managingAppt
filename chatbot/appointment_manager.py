import requests
from langchain_core.tools import tool

BACKEND_URL = "http://localhost:3000"  # Change this to your actual backend URL

@tool
def manage_appointments(action: str, **kwargs):
    """Main function to manage appointments: fetch, delete, or reschedule.

    Args:
        action (str): The action to perform ('fetch', 'delete', 'reschedule').
        **kwargs: Additional arguments based on the action.

    Returns:
        The response based on the action performed.
    """
    if action == "fetch":
        response = requests.get(f"{BACKEND_URL}/api/appointment")
        return response.json() if response.status_code == 200 else f"Error: {response.text}"

    elif action == "delete":
        name = kwargs.get("name")
        appointments = requests.get(f"{BACKEND_URL}/api/appointment").json()
        for appointment in appointments:
            patient_name = f"{appointment['patient']['firstName']} {appointment['patient']['lastName']}"
            if patient_name == name:
                appointment_id = appointment["id"]
                delete_response = requests.delete(f"{BACKEND_URL}/api/appointment/{appointment_id}")
                if delete_response.status_code == 200:
                    return f"Appointment for {name} has been successfully canceled."
                else:
                    return f"Error deleting appointment: {delete_response.text}"
        return f"No appointment found for {name}."

    elif action == "reschedule":
        appointment_id = kwargs.get("id")
        new_date = kwargs.get("new_date")
        new_time = kwargs.get("new_time")
        response = requests.patch(
            f"{BACKEND_URL}/api/appointment/reschedule/{appointment_id}",
            json={"new_date": new_date, "new_time": new_time}
        )
        return f"Appointment rescheduled to {new_date} at {new_time}" if response.status_code == 200 else f"Error: {response.text}"

    else:
        return "Invalid action specified."

@tool
def get_current_appointments():
    """Retrieve all current appointments."""
    return manage_appointments.invoke({"action": "fetch"})

@tool
def delete_appointment(name: str, health_card: str, doctor_name: str):
    """Cancel an appointment based on the patient's name, health card number, and doctor's name.

    Args:
        name (str): The patient's full name (e.g., "Jane Smith").
        health_card (str): The patient's health card number.
        doctor_name (str): The doctor's full name (e.g., "Dr. Bob Williams").

    Returns:
        str: Success message or error message.
    """
    # Remove the 'Dr. ' prefix if present in the doctor_name
    doctor_name_cleaned = doctor_name.replace("Dr. ", "").strip()

    print(f"[Debug] delete_appointment called with name: {name}, health_card: {health_card}, doctor_name: {doctor_name_cleaned}")  # Debug log

    # Fetch current appointments
    response = requests.get(f"{BACKEND_URL}/api/appointment")
    if response.status_code != 200:
        return f"Error fetching appointments: {response.text}"
    
    appointments = response.json()

    # Debugging log to see all fetched appointments
    print(f"[Debug] Retrieved appointments: {appointments}")

    # Find the appointment with the matching patient's full name, health card number, and doctor's full name
    for appointment in appointments:
        patient = appointment.get('patient', {})
        doctor = appointment.get('doctor', {})

        patient_name = f"{patient.get('firstName')} {patient.get('lastName')}"
        doctor_full_name = f"{doctor.get('firstName')} {doctor.get('lastName')}"
        patient_health_card = patient.get('healthCardNumber')

        print(f"[Debug] Checking patient_name: {patient_name}, health_card: {patient_health_card}, doctor: {doctor_full_name}")  # Debug log

        if (
            patient_name.lower() == name.lower() and
            patient_health_card == health_card and
            doctor_full_name.lower() == doctor_name_cleaned.lower()
        ):
            appointment_id = appointment.get('id')
            print(f"[Debug] Found appointment ID to delete: {appointment_id}")  # Debug log

            # Send delete request
            delete_response = requests.delete(f"{BACKEND_URL}/api/appointment/{appointment_id}")
            if delete_response.status_code == 200:
                return f"Appointment for {name} with Dr. {doctor_full_name} has been successfully canceled."
            else:
                return f"Failed to delete appointment for {name}. Error: {delete_response.text}"

    return f"No matching appointment found for {name} with health card {health_card} and Dr. {doctor_name_cleaned}."

# Backend URL (ensure it's correct)
BACKEND_URL = "http://localhost:3000"

from datetime import datetime

@tool
def reschedule_appointment(name: str, health_card: str, doctor_name: str, new_date: str, new_time: str):
    """Reschedule an appointment to a new date and time based on the patient's name, health card number, and doctor's name.

    Args:
        name (str): The patient's full name (e.g., "Jane Smith").
        health_card (str): The patient's health card number.
        doctor_name (str): The doctor's full name (e.g., "Dr. Bob Williams").
        new_date (str): The new date in 'YYYY-MM-DD' format.
        new_time (str): The new time in 'HH:MM:SS' (24-hour) format.

    Returns:
        str: Success message or error message.
    """
    # Remove the 'Dr. ' prefix if present in the doctor_name
    doctor_name_cleaned = doctor_name.replace("Dr. ", "").strip().lower()

    print(f"[Debug] reschedule_appointment called with name: {name}, health_card: {health_card}, doctor_name: {doctor_name_cleaned}")

    # Fetch current appointments
    response = requests.get(f"{BACKEND_URL}/api/appointment")
    if response.status_code != 200:
        return {"error": f"Error fetching appointments: {response.text}"}
    
    appointments = response.json()

    # Debugging log to see all fetched appointments
    print(f"[Debug] Retrieved appointments: {appointments}")

    # Find the appointment with the matching patient's full name, health card number, and doctor's full name
    for appointment in appointments:
        patient = appointment.get('patient', {})
        doctor = appointment.get('doctor', {})

        patient_name = f"{patient.get('firstName')} {patient.get('lastName')}".lower()
        doctor_full_name = f"{doctor.get('firstName')} {doctor.get('lastName')}".lower()
        patient_health_card = patient.get('healthCardNumber')

        print(f"[Debug] Checking patient_name: {patient_name}, health_card: {patient_health_card}, doctor: {doctor_full_name}")

        if (
            patient_name == name.lower() and
            patient_health_card == health_card and
            doctor_full_name == doctor_name_cleaned
        ):
            appointment_id = appointment.get('id')
            print(f"[Debug] Found appointment ID to reschedule: {appointment_id}")

            # Combine new_date and new_time into a valid datetime string
            combined_datetime_str = f"{new_date}T{new_time}:00Z"

            try:
                # Validate the combined datetime string
                combined_datetime = datetime.fromisoformat(combined_datetime_str.replace("Z", "+00:00"))
            except ValueError as e:
                return {"error": f"Invalid date-time format: {combined_datetime_str}", "details": str(e)}

            print(f"[Debug] Rescheduling appointment with ID: {appointment_id}, New Date-Time: {combined_datetime}")

            # Perform the API call
            reschedule_response = requests.patch(
                f"{BACKEND_URL}/api/appointment/reschedule/{appointment_id}",
                json={"newDateTime": combined_datetime.isoformat()}
            )

            if reschedule_response.status_code == 200:
                return {"success": f"Appointment for {name} with Dr. {doctor.get('firstName')} {doctor.get('lastName')} has been successfully rescheduled to {new_date} at {new_time}."}
            else:
                return {"error": reschedule_response.text, "status_code": reschedule_response.status_code}

    return {"error": f"No matching appointment found for {name} with health card {health_card} and Dr. {doctor_name}."}







