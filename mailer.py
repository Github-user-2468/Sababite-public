import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv
from flask import url_for

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


def send_email(subject, body, to_email):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg.set_content(body)

    try:
        # Connect to Outlook SMTP server
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.ehlo() # Establish ehlo connection
            smtp.starttls()  # Upgrade the connection to secure tls connection
            smtp.ehlo() # Reinstate ehlo connection
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD) # Login to email using app password
            smtp.send_message(msg) # Email out the message
            print("Email sent via Gmail!") # Confirm email was sent
            return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False

def send_reset_email(user_email, reset_token):
    reset_link = url_for('reset_with_token', token=reset_token, _external=True)
    subject = "Reset your Python Pantry password"
    body = f"Click the following link to reset your password: {reset_link}"
    return send_email(subject, body, user_email)