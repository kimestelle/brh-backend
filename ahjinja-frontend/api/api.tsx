const API_URL = 'http://localhost:3000';

export async function getMatch(item: string, category: string): Promise<string[]> {
    try {
        const response = await fetch(`${API_URL}/getMatch?item=${encodeURIComponent(item)}&category=${encodeURIComponent(category)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch match items');
        }
        const data = await response.json();
        return data.images;
    } catch (error) {
        console.error('Error fetching match items:', error);
        return [];
    }
}
