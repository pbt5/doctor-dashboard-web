# doctor-dashboard-web

**Demo Prototype - Doctor Management Dashboard**

## Overview
Simple web dashboard for demo smart pill box system. Allows doctors to view patient medication history and adherence.

## Demo Purpose
This is a **prototype for demonstration** providing doctor interface:
1. View list of patients using smart pill boxes
2. See medication event history for each patient
3. Monitor medication adherence in real-time
4. Simple, clean interface for demo presentation

## Quick Setup

### Requirements
- React or Vue.js frontend
- Connection to cloud-server API

### Steps
1. Install dependencies: `npm install`
2. Configure API endpoint in `.env`:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```
3. Start dev server: `npm run dev`
4. Open browser: http://localhost:5173

## Demo Features

### Patient List View
- Shows all patients with smart pill boxes
- Basic info: Name, Patient ID, Last activity

### Patient Detail View
- Medication event timeline
- Today's adherence summary
- Recent events (last 7 days)

### Simple Dashboard
- No complex authentication (demo only)
- No advanced analytics
- Focus on basic data display

## API Integration

Calls cloud-server API:

### Get Patient Events
```javascript
fetch('http://localhost:3000/api/patients/pt_001/events')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Example Response
```json
{
  "patient_id": "pt_001",
  "events": [
    {
      "timestamp": "2025-10-06T22:30:00Z",
      "event": "medication_taken",
      "compartment": 1
    }
  ]
}
```

## Demo UI Components

### PatientList.jsx
```jsx
function PatientList() {
  const [patients, setPatients] = useState([]);
  
  useEffect(() => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(setPatients);
  }, []);
  
  return (
    <div>
      {patients.map(p => 
        <PatientCard key={p.id} patient={p} />
      )}
    </div>
  );
}
```

## Related Demo Repos
- `wifi-comm-module` - Generates events shown in dashboard
- `cloud-server` - Provides API for this dashboard
- `medical-db` - Stores data displayed here
- `patient-app-notify` - Companion app for patients
