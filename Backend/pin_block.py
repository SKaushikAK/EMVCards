import binascii

def iso0_pin_block(pin, pan):
    pin = str(pin)
    if len(pin) < 4 or len(pin) > 12:
        raise ValueError("PIN must be between 4 and 12 digits")

    if len(pan) < 16:
        raise ValueError("PAN must be at least 16 digits")

    # Step 1: Create PIN Block (ISO-0 Format)
    pin_block = f"0{len(pin)}{pin}".ljust(16, "F")  # Pad with 'F'
    pin_block_bytes = bytes.fromhex(pin_block)

    # Step 2: Get the last 12 digits of PAN (excluding the last check digit)
    pan_block = "0000" + pan[-13:-1]  # Extract last 12 digits (excluding Luhn digit)
    pan_block_bytes = bytes.fromhex(pan_block)

    # Step 3: XOR PIN Block with PAN Block
    xor_result = bytes(a ^ b for a, b in zip(pin_block_bytes, pan_block_bytes))

    return binascii.hexlify(xor_result).decode().upper()  # Convert to HEX
if __name__ == "__main__":
    # Example Usage
    pin = "1234"  # User PIN
    pan = "43219876543210987"  # Card Number (PAN)

    pin_block = iso0_pin_block(pin, pan)
    print(f"Generated PIN Block: {pin_block}, {type(pin_block)}")
