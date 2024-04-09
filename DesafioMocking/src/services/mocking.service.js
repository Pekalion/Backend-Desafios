export const generateMockingProducts = () => {
    return Array.from({ length: 100 }, (_, index) => ({
      title: `Mocked Product ${index + 1}`,
      description: 'Mocked Description',
      code: `M${index + 1}`,
      price: 10.0,
      status: true,
      stock: 10,
      category: 'Mocked Category',
      thumbnail: 'mocked-thumbnail-url'
    }));
};