import { useState } from 'react'
import WeekScheduleEditor from './WeekScheduleEditor'
import MedicationRecordsList from './MedicationRecordsList'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [patientId, setPatientId] = useState('')
  const [patients, setPatients] = useState([])
  const [medications, setMedications] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)

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

  const handlePatientSelect = (id) => {
    setPatientId(id)
    setSelectedPatient(id)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px' }}>
        醫師病患管理儀表板
      </h1>
      
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>病患選擇</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="輸入病患ID"
            style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #bdc3c7', flex: 1 }}
          />
          <button
            onClick={fetchPatients}
            disabled={loading}
            style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
          >
            {loading ? '載入中...' : '查詢病患'}
          </button>
          <button
            onClick={fetchMedications}
            disabled={loading || !patientId}
            style={{ padding: '10px 20px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
          >
            查詢用藥
          </button>
        </div>
      </div>

      {selectedPatient && (
        <>
          <WeekScheduleEditor patientId={selectedPatient} />
          <MedicationRecordsList patientId={selectedPatient} />
        </>
      )}

      {patients.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>病患列表</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {patients.map(patient => (
              <li
                key={patient.id}
                onClick={() => handlePatientSelect(patient.id)}
                style={{
                  padding: '15px',
                  marginBottom: '10px',
                  backgroundColor: selectedPatient === patient.id ? '#3498db' : '#fff',
                  color: selectedPatient === patient.id ? '#fff' : '#000',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <strong>{patient.name}</strong> (ID: {patient.id})
              </li>
            ))}
          </ul>
        </div>
      )}

      {medications.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>用藥記錄</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>藥物名稱</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>劑量</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>頻率</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>開始日期</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((med, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ecf0f1' : '#fff' }}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{med.name}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{med.dosage}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{med.frequency}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{med.start_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
