import { Page } from '@playwright/test';

interface BookBody {
    title: string;
    author: string;
    isbn: string;
    price: number;
    category?: string;
    description?: string;
    publicationYear?: number;
    publisher?: string;
    stock?: number;
    coverImage?: string;
}

class _BooksApi {
    constructor(private page: Page) { }

    async getAllBooks() {
        const response = await this.page.request.get('/api/books');
        return response;
    }

    async getBookById(id: number) {
        const response = await this.page.request.get(`/api/books/${id}`);
        return response;
    }

    async getBooksByCategory(category: string) {
        const response = await this.page.request.get(`/api/books?category=${category}`);
        return response;
    }

    async getBooksByAuthor(author: string) {
        const response = await this.page.request.get(`/api/books?author=${author}`);
        return response;
    }

    async searchBooks(searchTerm: string) {
        const response = await this.page.request.get(`/api/books?search=${searchTerm}`);
        return response;
    }

    async createBook(title: string, author: string, isbn: string, price: number, category?: string, description?: string, publicationYear?: number, publisher?: string, stock?: number, coverImage?: string) {
        const body: BookBody = {
            title,
            author,
            isbn,
            price,
            category,
            description,
            publicationYear,
            publisher,
            stock,
            coverImage
        };
        const response = await this.page.request.post('/api/books', { data: body });
        return response;
    }

    async updateBook(id: number, updates: Partial<BookBody>) {
        const response = await this.page.request.put(`/api/books/${id}`, { data: updates });
        return response;
    }

    async deleteBook(id: number) {
        const response = await this.page.request.delete(`/api/books/${id}`);
        return response;
    }
}

export const booksApi = (page: Page) => new _BooksApi(page);
