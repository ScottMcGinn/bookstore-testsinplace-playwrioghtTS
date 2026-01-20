import { test, expect } from '@playwright/test';
import { booksApi } from '../playwright/lib/booksApi.lib';

test.describe.configure({ mode: 'serial' });
test.describe('Books API tests @APITest', () => {
    let createdBookId: number;

    test('Get all books', async ({ page }) => {
        const response = await booksApi(page).getAllBooks();
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
    });

    test('Get book by ID', async ({ page }) => {
        const response = await booksApi(page).getBookById(1);
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody).toBeDefined();
        expect(responseBody.id).toBe(1);
        expect(responseBody.title).toBeDefined();
        expect(responseBody.author).toBeDefined();
        expect(responseBody.isbn).toBeDefined();
        expect(responseBody.price).toBeDefined();
    });

    test('Get books by category', async ({ page }) => {
        const response = await booksApi(page).getBooksByCategory('Fiction');
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        responseBody.forEach((book: any) => {
            expect(book.category).toBe('Fiction');
        });
    });

    test('Get books by author', async ({ page }) => {
        const response = await booksApi(page).getBooksByAuthor('George Orwell');
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        responseBody.forEach((book: any) => {
            expect(book.author.toLowerCase()).toContain('george orwell'.toLowerCase());
        });
    });

    test('Search books', async ({ page }) => {
        const response = await booksApi(page).searchBooks('1984');
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
    });

    test('Create a new book', async ({ page }) => {
        const response = await booksApi(page).createBook(
            'Test Book',
            'Test Author',
            '978-0-TEST-000-0',
            19.99,
            'Fiction',
            'A test book description',
            2024,
            'Test Publisher',
            10,
            ''
        );
        
        expect(response.status()).toBe(201);
        
        const responseBody = await response.json();
        expect(responseBody).toBeDefined();
        expect(responseBody.id).toBeDefined();
        expect(responseBody.title).toBe('Test Book');
        expect(responseBody.author).toBe('Test Author');
        expect(responseBody.isbn).toBe('978-0-TEST-000-0');
        expect(responseBody.price).toBe(19.99);
        expect(responseBody.category).toBe('Fiction');
        
        createdBookId = responseBody.id;
    });

    test('Update a book', async ({ page }) => {
        const createResponse = await booksApi(page).createBook(
            'Update Test Book',
            'Update Author',
            '978-0-UPD-000-0',
            15.99
        );
        const createdBook = await createResponse.json();
        
        const response = await booksApi(page).updateBook(createdBook.id, {
            title: 'Updated Book Title',
            price: 25.99
        });
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody.title).toBe('Updated Book Title');
        expect(responseBody.price).toBe(25.99);
        expect(responseBody.author).toBe('Update Author');
    });

    test('Delete a book', async ({ page }) => {
        const createResponse = await booksApi(page).createBook(
            'Delete Test Book',
            'Delete Author',
            '978-0-DEL-000-0',
            12.99
        );
        const createdBook = await createResponse.json();
        
        const response = await booksApi(page).deleteBook(createdBook.id);
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody.message).toBe('Book deleted successfully');
    });

    test('Get non-existent book returns 404', async ({ page }) => {
        const response = await booksApi(page).getBookById(999999);
        
        expect(response.status()).toBe(404);
        
        const responseBody = await response.json();
        expect(responseBody.error).toBe('Book not found');
    });
});
