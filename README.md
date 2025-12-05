# Mini HR Management System

A modern HR Management System prototype built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

**URL**: https://lovable.dev/projects/13ed195a-7fba-4886-bfc8-1d16f12435cd

### Demo Credentials
- **Admin Access**: `admin@company.com` / `admin123`
- **Employee Access**: `employee@company.com` / `employee123`

---

## 📊 System Architecture Diagrams

### 1. High-Level System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[React UI Components]
        Router[React Router - HashRouter]
        Auth[Auth Context]
        State[React Query State]
    end
    
    subgraph "Application Layer"
        Pages[Pages - Admin/Employee]
        Components[Reusable Components]
        Hooks[Custom Hooks]
        Utils[Utility Functions]
    end
    
    subgraph "Data Layer"
        Mock[Mock Data Store]
        Types[TypeScript Types]
    end
    
    UI --> Router
    Router --> Auth
    Auth --> Pages
    Pages --> Components
    Pages --> Hooks
    Components --> State
    State --> Mock
    Mock --> Types
```

### 2. User Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant LP as Login Page
    participant AC as Auth Context
    participant R as Router
    participant AD as Admin Dashboard
    participant ED as Employee Dashboard
    
    U->>LP: Enter Credentials
    LP->>AC: Validate Credentials
    
    alt Valid Admin Credentials
        AC->>AC: Set Role = "admin"
        AC->>R: Redirect
        R->>AD: Navigate to /admin
        AD->>U: Show Admin Dashboard
    else Valid Employee Credentials
        AC->>AC: Set Role = "employee"
        AC->>R: Redirect
        R->>ED: Navigate to /employee
        ED->>U: Show Employee Dashboard
    else Invalid Credentials
        AC->>LP: Show Error Toast
        LP->>U: Display Error Message
    end
```

### 3. Role-Based Access Control (RBAC)

```mermaid
graph LR
    subgraph "User Roles"
        Admin[👤 Admin]
        Employee[👤 Employee]
    end
    
    subgraph "Admin Permissions"
        A1[View All Employees]
        A2[Add/Edit Employees]
        A3[Manage Attendance]
        A4[Approve/Reject Leaves]
        A5[Manage Payroll]
        A6[View Reports]
    end
    
    subgraph "Employee Permissions"
        E1[View Own Profile]
        E2[Check-in/Check-out]
        E3[Request Leaves]
        E4[View Own Salary]
        E5[View Own Attendance]
    end
    
    Admin --> A1
    Admin --> A2
    Admin --> A3
    Admin --> A4
    Admin --> A5
    Admin --> A6
    
    Employee --> E1
    Employee --> E2
    Employee --> E3
    Employee --> E4
    Employee --> E5
```

### 4. Database Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ EMPLOYEES : "has profile"
    USERS ||--o{ USER_ROLES : "has role"
    EMPLOYEES ||--o{ ATTENDANCE : "records"
    EMPLOYEES ||--o{ LEAVE_REQUESTS : "submits"
    DEPARTMENTS ||--o{ EMPLOYEES : "contains"
    
    USERS {
        uuid id PK
        string email
        string full_name
        string phone
        string avatar_url
        timestamp created_at
    }
    
    EMPLOYEES {
        uuid id PK
        uuid user_id FK
        string employee_id
        string position
        decimal salary
        date date_of_joining
        uuid department_id FK
        string address
        string emergency_contact
    }
    
    DEPARTMENTS {
        uuid id PK
        string name
        string description
    }
    
    ATTENDANCE {
        uuid id PK
        uuid employee_id FK
        date date
        time check_in_time
        time check_out_time
        enum status
        string notes
    }
    
    LEAVE_REQUESTS {
        uuid id PK
        uuid employee_id FK
        date start_date
        date end_date
        string leave_type
        string reason
        enum status
        string admin_notes
    }
    
    USER_ROLES {
        uuid id PK
        uuid user_id FK
        enum role
    }
```

### 5. Application Navigation Flow

```mermaid
graph TD
    Start[🏠 Landing Page] --> Login[🔐 Login Page]
    
    Login -->|Admin Login| AdminDash[📊 Admin Dashboard]
    Login -->|Employee Login| EmpDash[📊 Employee Dashboard]
    
    subgraph "Admin Routes"
        AdminDash --> Employees[👥 Employees Management]
        AdminDash --> AdminAtt[📅 Attendance Overview]
        AdminDash --> LeaveReq[📝 Leave Requests]
        AdminDash --> Payroll[💰 Payroll Management]
        
        Employees --> AddEmp[➕ Add Employee]
        Employees --> EditEmp[✏️ Edit Employee]
        Employees --> ViewEmp[👁️ View Employee]
        
        LeaveReq --> Approve[✅ Approve Leave]
        LeaveReq --> Reject[❌ Reject Leave]
    end
    
    subgraph "Employee Routes"
        EmpDash --> EmpAtt[📅 My Attendance]
        EmpDash --> EmpLeave[📝 My Leaves]
        EmpDash --> EmpSalary[💰 My Salary]
        
        EmpAtt --> CheckIn[⏰ Check In]
        EmpAtt --> CheckOut[⏰ Check Out]
        
        EmpLeave --> NewLeave[➕ New Leave Request]
    end
```

### 6. Leave Request State Machine

```mermaid
stateDiagram-v2
    [*] --> Draft: Employee creates request
    Draft --> Pending: Submit request
    Pending --> Approved: Admin approves
    Pending --> Rejected: Admin rejects
    Approved --> [*]: Leave taken
    Rejected --> Draft: Employee can resubmit
    Rejected --> [*]: Request cancelled
    
    note right of Pending
        Admin receives notification
        for pending requests
    end note
    
    note right of Approved
        Employee receives approval
        notification with dates
    end note
```

### 7. Attendance Status Flow

```mermaid
graph LR
    subgraph "Daily Attendance States"
        None[No Record] -->|Check-in before 9:00| Present[✅ Present]
        None -->|Check-in after 9:00| Late[⚠️ Late]
        None -->|No check-in| Absent[❌ Absent]
        Present -->|Check-out before 4:00| HalfDay[🕐 Half Day]
        Late -->|Check-out| LateComplete[⚠️ Late - Complete]
    end
    
    subgraph "Status Colors"
        Green[🟢 Present]
        Yellow[🟡 Late]
        Red[🔴 Absent]
        Orange[🟠 Half Day]
    end
```

### 8. Component Hierarchy

```mermaid
graph TB
    App[App.tsx]
    
    App --> Providers[Providers]
    Providers --> QueryClient[QueryClientProvider]
    Providers --> Tooltip[TooltipProvider]
    Providers --> AuthProv[AuthProvider]
    
    App --> Router[HashRouter]
    Router --> Routes[Routes]
    
    Routes --> Public[Public Routes]
    Routes --> Protected[Protected Routes]
    
    Public --> Index[Index Page]
    Public --> AuthPage[Auth Page]
    
    Protected --> AdminRoutes[Admin Routes]
    Protected --> EmpRoutes[Employee Routes]
    
    AdminRoutes --> Layout1[Layout Component]
    EmpRoutes --> Layout2[Layout Component]
    
    Layout1 --> Sidebar[Sidebar Navigation]
    Layout1 --> Content[Main Content Area]
    
    subgraph "Shared UI Components"
        Button[Button]
        Card[Card]
        Input[Input]
        Table[Table]
        Dialog[Dialog]
        Toast[Toast/Sonner]
    end
```

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React 18 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Routing** | React Router v6 |
| **State Management** | React Query (TanStack Query) |
| **Build Tool** | Vite |
| **Icons** | Lucide React |
| **Notifications** | Sonner |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Layout.tsx          # Main layout with sidebar
│   └── ui/                     # shadcn/ui components
├── contexts/
│   └── AuthContext.tsx         # Authentication context
├── data/
│   └── mock/                   # Mock data for prototype
│       ├── employees.ts
│       ├── attendance.ts
│       ├── leaves.ts
│       └── index.ts
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── pages/
│   ├── admin/                  # Admin pages
│   │   ├── AdminDashboard.tsx
│   │   ├── Employees.tsx
│   │   ├── Attendance.tsx
│   │   ├── LeaveRequests.tsx
│   │   └── Payroll.tsx
│   ├── employee/               # Employee pages
│   │   ├── EmployeeDashboard.tsx
│   │   ├── EmployeeAttendance.tsx
│   │   ├── EmployeeLeaves.tsx
│   │   └── EmployeeSalary.tsx
│   ├── Auth.tsx               # Login page
│   ├── Index.tsx              # Landing page
│   └── NotFound.tsx           # 404 page
├── App.tsx                    # Main app component
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

1. Push code to GitHub repository
2. Go to **Settings** → **Pages**
3. Set Source to **GitHub Actions** or deploy from `dist` folder
4. Access at: `https://yourusername.github.io/repo-name/`

---

## 📝 Features

### Admin Features
- ✅ Dashboard with statistics overview
- ✅ Employee management (CRUD operations)
- ✅ Attendance tracking and reports
- ✅ Leave request approval/rejection
- ✅ Payroll management

### Employee Features
- ✅ Personal dashboard
- ✅ Check-in/Check-out for attendance
- ✅ Leave request submission
- ✅ Salary slip viewing
- ✅ Attendance history

---

## 🔐 Security Features

- Role-based access control (Admin/Employee)
- Protected routes with authentication guards
- Session management via Auth Context

---

## 📄 License

This project is for educational and demonstration purposes.
