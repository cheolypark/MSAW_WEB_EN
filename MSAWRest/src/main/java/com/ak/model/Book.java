package com.ak.model;
public class Book {
    private String title;
    private String description;
    private String author;
    private String publisher;
    private String isbn;
    private String publishedDate;
    private float price;
 
    public Book() {
    }
 
    public Book(String title, String description, String author, String publisher,
            String isbn, String publishedDate, float price) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.publisher = publisher;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.price = price;
    }

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getPublishedDate() {
		return publishedDate;
	}

	public void setPublishedDate(String publishedDate) {
		this.publishedDate = publishedDate;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}
}