# RBAC Dashboard

## Introduction

The RBAC (Role-Based Access Control) Dashboard is a comprehensive web application built with Next.js and React. It provides a user-friendly interface for managing users and roles within an organization, implementing core principles of role-based access control.

## Features

### 1. User Management

- View a list of users with details such as name, email, role, and status
- Add new users to the system
- Edit existing user information
- Delete users from the system
- Search users by name
- Filter users by role
- Pagination for user list

### 2. Role Management

- View a list of roles with their associated permissions and custom attributes
- Add new roles to the system
- Edit existing role information, including permissions and custom attributes
- Delete roles from the system
- Search roles by name
- Pagination for role list

### 3. Authentication

- Simulated login functionality (for demonstration purposes)
- Persistent user session using local storage

### 4. Responsive Design

- Fully responsive layout that works on desktop and mobile devices
- Optimized table views for different screen sizes

### 5. User Interface

- Clean and modern UI using Tailwind CSS
- Animated transitions for improved user experience
- Tabbed interface to switch between User and Role management

## Components

1. `app/page.tsx`: Main dashboard component with tabs for User and Role management
2. `components/header.tsx`: Application header with title
3. `components/auth-provider.tsx`: Context provider for authentication
4. `components/user-management.tsx`: User management interface
5. `components/role-management.tsx`: Role management interface
6. `components/user-table.tsx`: Responsive table for displaying user information
7. `components/add-edit-user-dialog.tsx`: Dialog for adding or editing user information
8. `components/ui/pagination-component.tsx`: Reusable pagination component

## Setup and Installation

1. Clone the repository
2. Install dependencies:

- Use `npm install` to install all the required dependencies.This includes Tailwind CSS, React, and other necessary libraries.
