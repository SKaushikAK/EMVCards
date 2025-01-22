from configparser import ConfigParser

def config(file = "database.ini", section = "postgres"):
    
    parser = ConfigParser()
    parser.read(file)
    db = {}
    
    if parser.has_section(section): 
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception(f'Section{section} is not found in the {file}')
    return db
    
if __name__ == '__main__':
    config()