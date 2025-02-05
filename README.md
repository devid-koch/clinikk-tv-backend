
# Clinikk TV - Backend Service (POC)

This is a basic backend service for **Clinikk TV**, a media streaming platform that provides health-related media content (both video and audio). The backend includes the core functionality to manage media uploads, retrieve media files, and handle errors effectively.

## Features

- **Upload Media**: Allows users to upload video or audio content.
- **Retrieve Media**: Fetch a list of all uploaded media or retrieve a specific media file by its ID.
- **Error Handling**: Basic error handling for file uploads and media retrieval.

---

## Architecture

- **Programming Language**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **File Storage**: Local storage (can be replaced with cloud storage like AWS S3 for scalability)
- **RESTful API**: Designed following modern API practices.
- **Security**: Basic input validation and error handling.

---

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/devid-koch/clinikk-tv-backend.git
cd clinikk-tv-backend
```

### 2. Install dependencies

Ensure you have Node.js and npm installed. Run the following command to install all required packages:

```bash
npm install
```

### 3. Configure PostgreSQL Database

Create a PostgreSQL database and configure it in the `config/database.js` file.


### 4. Run the application

Make sure the database is set up, and then start the server:

```bash
npm start
```

The application should now be running on `http://localhost:5000`.

---

## API Endpoints

### 1. **Upload Media**
- **Endpoint**: `POST /media/upload`
- **Description**: Upload a video or audio file to the server.
- **Request**: Form-data with `title`, `type`, and the `file` to upload (either video or audio).
  
  Example:
  - `title`: "Health Video"
  - `type`: "video"
  - `file`: File to upload (MP4, MP3, etc.)
  
- **Response**:
  ```json
  {
      "message": "Media uploaded successfully.",
      "media": {
          "id": "unique-media-id",
          "title": "Health Video",
          "type": "video",
          "filePath": "uploads/media-id_sample.mp4"
      }
  }
  ```

---

### 2. **Get All Media**
- **Endpoint**: `GET /media`
- **Description**: Retrieve a list of all uploaded media files.
  
- **Response**:
  ```json
  [
      {
          "id": "unique-media-id",
          "title": "Health Video",
          "type": "video",
          "filePath": "uploads/media-id_sample.mp4"
      }
  ]
  ```

---

### 3. **Get Media by ID**
- **Endpoint**: `GET /media/:id`
- **Description**: Retrieve a specific media file by its ID.
  
- **Response**: Returns the media file for streaming or download.

---

### 4. **Error Handling**
- **Case 1**: Upload without a file.
  - **Response**:
    ```json
    {
        "error": "No file uploaded."
    }
    ```

- **Case 2**: Invalid file type.
  - **Response**:
    ```json
    {
        "error": "Invalid file type. Only MP4 and MP3 are allowed."
    }
    ```
