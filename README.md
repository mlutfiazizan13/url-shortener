# URL Shortener

![License](https://img.shields.io/github/license/mlutfiazizan13/url-shortener)
![Issues](https://img.shields.io/github/issues/mlutfiazizan13/url-shortener)
![Stars](https://img.shields.io/github/stars/mlutfiazizan13/url-shortener)

A simple and efficient URL shortener service. Take long URLs and shorten them to easy-to-share links. Built for speed, reliability, and ease-of-use.

## Features

- Shorten long URLs to custom or random short codes
- Redirect from short links to the original URL
- API for programmatic shortening and redirection
- Click analytics and tracking (if supported)
- Easy deployment and configuration

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- Database (PostgreSQL)

### Installation

Clone the repository:

```bash
git clone https://github.com/mlutfiazizan13/url-shortener.git
cd url-shortener
```

Install dependencies:


**Backend:**
```bash
cd backend
npm install
```
**Frontend:**
```bash
cd frontend
npm install
```

Create a `.env` file and set your configuration variables (see `.env.example`).

### Running Locally

**Backend:**
```bash
cd backend
npm run start
```
**Frontend:**
```bash
cd frontend
npm run dev
```

## API Usage

[Postman Collection](https://documenter.getpostman.com/view/14331304/2sB3WwpH83)

## Configuration

All configuration can be set via environment variables. See `.env.example` for details.