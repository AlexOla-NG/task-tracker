# Task Tracker API

Base URL: /api/items

## Endpoints

### GET /api/items
- Returns list of items
- Response 200: array of Item

### POST /api/items
- Request body: { title: string (3-100), description?: string (max 500), status?: 'todo' | 'in-progress' | 'done' }
- Response 201: created Item
- Response 400: { error: 'Validation failed', details: ... }

### GET /api/items/{id}
- Path params: id (Mongo ObjectId)
- Response 200: Item
- Response 400: { error: 'Invalid id' }
- Response 404: { error: 'Item not found' }

### PUT /api/items/{id}
- Request body: { title?: string, description?: string, status?: 'todo' | 'in-progress' | 'done' }
- Response 200: updated Item
- Response 400: { error: 'Validation failed' } or { error: 'Invalid id' }
- Response 404: { error: 'Item not found' }

### DELETE /api/items/{id}
- Response 200: { success: true }
- Response 400: { error: 'Invalid id' }
- Response 404: { error: 'Item not found' }

## Data Model: Item
- _id: string
- title: string
- description?: string
- status: 'todo' | 'in-progress' | 'done'
- createdAt, updatedAt: date

## Error format
Consistent error responses with JSON: { error: "message", details?: ... }
