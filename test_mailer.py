"""
Test script for the mailer functionality
Run this to verify your email configuration is working
"""

import os
from dotenv import load_dotenv
from mailer import send_email, send_reset_email

# Load environment variables
load_dotenv()

def test_basic_email():
    """Test sending a basic email"""
    print("\n" + "="*50)
    print("TEST 1: Basic Email Test")
    print("="*50)
    
    # Check if environment variables are loaded
    email_address = os.getenv("EMAIL_ADDRESS")
    email_password = os.getenv("EMAIL_PASSWORD")
    
    print(f"Email Address: {email_address}")
    print(f"Password Length: {len(email_password) if email_password else 0} characters")
    print(f"Password (masked): {'*' * len(email_password) if email_password else 'NOT SET'}")
    
    if not email_address or not email_password:
        print("\n❌ ERROR: EMAIL_ADDRESS or EMAIL_PASSWORD not found in .env file!")
        return False
    
    # Get test recipient email
    test_email = input("\nEnter YOUR email address to receive test email: ").strip()
    
    if not test_email:
        print("❌ No email provided. Test cancelled.")
        return False
    
    print(f"\nSending test email to: {test_email}")
    
    subject = "Python Pantry - Test Email"
    body = """Hello!

This is a test email from Python Pantry.

If you're receiving this, your email configuration is working correctly! 🎉

Thanks,
The Python Pantry Team
"""
    
    result = send_email(subject, body, test_email)
    
    if result:
        print("\n✅ SUCCESS: Email sent successfully!")
        print(f"Check your inbox at {test_email}")
        return True
    else:
        print("\n❌ FAILED: Email was not sent.")
        print("Check the error messages above for details.")
        return False


def test_reset_email():
    """Test sending a password reset email"""
    print("\n" + "="*50)
    print("TEST 2: Password Reset Email Test")
    print("="*50)
    
    # Get test recipient email
    test_email = input("\nEnter YOUR email address to receive reset email: ").strip()
    
    if not test_email:
        print("❌ No email provided. Test cancelled.")
        return False
    
    # Generate a fake token for testing
    fake_token = "test-token-12345-abcdef"
    
    print(f"\nSending password reset email to: {test_email}")
    print(f"Using test token: {fake_token}")
    
    # Note: This will fail if Flask app context is not available
    # because url_for needs app context
    print("\n⚠️  WARNING: This test requires Flask app context.")
    print("It may fail with 'RuntimeError: Working outside of application context'")
    print("If it fails, that's OK - Test 1 is the important one!\n")
    
    try:
        result = send_reset_email(test_email, fake_token)
        
        if result:
            print("\n✅ SUCCESS: Reset email sent successfully!")
            print(f"Check your inbox at {test_email}")
            return True
        else:
            print("\n❌ FAILED: Reset email was not sent.")
            return False
    except RuntimeError as e:
        print(f"\n⚠️  Expected Error (no Flask context): {e}")
        print("This is normal when testing outside Flask app.")
        print("Test 1 already confirmed your email works! ✅")
        return None


def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("  PYTHON PANTRY EMAIL CONFIGURATION TEST")
    print("="*60)
    
    # Test basic email
    test1_result = test_basic_email()
    
    if not test1_result:
        print("\n❌ Basic email test failed. Fix this before continuing.")
        print("\nCommon issues:")
        print("1. Check your .env file has EMAIL_ADDRESS and EMAIL_PASSWORD")
        print("2. Remove spaces from the app password")
        print("3. Make sure you're using a Gmail App Password (not regular password)")
        print("4. Verify 2FA is enabled on your Gmail account")
        return
    
    # Ask if user wants to test reset email
    print("\n" + "-"*60)
    test_reset = input("\nDo you want to test the reset email? (y/n): ").strip().lower()
    
    if test_reset == 'y':
        test_reset_email()
    
    print("\n" + "="*60)
    print("  TEST COMPLETE")
    print("="*60)
    print("\nIf Test 1 passed, your mailer is configured correctly! 🥔✅")


if __name__ == "__main__":
    main()