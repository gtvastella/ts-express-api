import axios from 'axios';
const API_URL = 'http://localhost:3000';
let UUID_CREATED: string = "";
import { generateRandomName, generateRandomEmail, generateRandomPhone } from '../util/random';

describe('POST /customer/create', () => {
    it('should create a new customer successfully', async () => {
        const data = {
            nome: generateRandomName(),
            email: generateRandomEmail(),
            telefone: generateRandomPhone()
        };


        const response = await axios.post(`${API_URL}/customer/create`, data);
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.message).toBe("Cliente criado com sucesso");
        UUID_CREATED = response.data.data.uuid;
    });
});

describe('GET /customer/list', () => {
    it('should return a list of customers', async () => {
        const response = await axios.get(`${API_URL}/customer/list`);
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.data.length).toBeGreaterThan(0);
    });
}
);

describe('GET /customer/get?id', () => {
    it('should return a customer by id', async () => {
        const response = await axios.get(`${API_URL}/customer/get?id=${UUID_CREATED}`);
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.message).toBe("Cliente encontrado");
        expect(response.data.data._id).toBe(UUID_CREATED);
    });
});

describe('POST /customer/update', () => {
    it('should update a customer successfully', async () => {
        const data = {
            id: UUID_CREATED,
            nome: generateRandomName(),
            email: generateRandomEmail(),
            telefone: generateRandomPhone()
        };
        const response = await axios.post(`${API_URL}/customer/update`, data);

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.message).toBe("Cliente atualizado");
    });
});