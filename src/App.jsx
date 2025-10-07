import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [patientId, setPatientId] = useState('')
  const [patients, setPatients] = useState([])
  const [medications, setMedications] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchPatients = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/patients`)
      const data = await response.json()
      setPatients(data)
    } catch (error) {
      alert('Failed to fetch patient data: ' + error.message)
    }
    setLoading(false)
  }

  const fetchMedications = async () => {
    if (!patientId) {
      alert('Enter patient ID')
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/medications/${patientId}`)
      const data = await response.json()
      setMedications(data)
    } catch (error) {
      alert('Failed to fetch medication records: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Doctor Dashboard</h1>
      
      <section style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
        <h2>Patient Query</h2>
        <button onClick={fetchPatients} disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? 'Loading...' : 'Get Patient Query'}
        </button>
        
        {patients.length > 0 && (
          <table style={{ marginTop: '15px', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Patient ID</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Gender</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Age</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{patient.id}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{patient.name}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{patient.}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{patient.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
        <h2>用藥紀錄查詢</h2>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="輸入Patient ID" 
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
          />
          <button onClick={fetchMedications} disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            {loading ? 'Loading...' : '查詢用藥紀錄'}
          </button>
        </div>
        
        {medications.length > 0 && (
          <table style={{ marginTop: '15px', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>藥物名稱</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>劑量</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>頻率</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>開始日期</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((med, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{med.name}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{med.dosage}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{med.frequency}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{med.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}

export default App
