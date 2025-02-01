def update_env_file(file_path, key, value):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    updated = False
    with open(file_path, 'w') as file:
        for line in lines:
            if line.startswith(f"{key}="):
                file.write(f"{key}={value}\n")
                updated = True
            else:
                file.write(line)
        if not updated:
            file.write(f"{key}={value}\n")

# Update .env file
if __name__ == '__main__':
    update_env_file('.env', 'DB_NAME', 'emvcards')
