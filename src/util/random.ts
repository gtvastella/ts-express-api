function generateRandomName() {
    const firstNames = ["João", "Maria", "Carlos", "Ana", "Pedro", "Juliana", "Lucas", "Fernanda"];
    const lastNames = ["Silva", "Santos", "Oliveira", "Pereira", "Lima", "Gomes", "Ribeiro", "Martins"];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
}

function generateRandomEmail() {
    const domains = ["example.com", "mail.com", "test.com", "demo.com"];
    const name = Math.random().toString(36).substring(7);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    return `${name}@${domain}`;
}

function generateRandomPhone() {
    const length = Math.random() < 0.5 ? 10 : 11;
    let phone = "";
    for (let i = 0; i < length; i++) {
        phone += Math.floor(Math.random() * 10);
    }
    return phone;
}

export { generateRandomName, generateRandomEmail, generateRandomPhone };
