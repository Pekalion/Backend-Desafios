import  {generateMockingProducts} from '../services/mocking.service.js';

export const mockingProducts = (req, res) => {
  const mockingProducts = generateMockingProducts();
  res.json(mockingProducts);
};