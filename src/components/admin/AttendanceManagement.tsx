import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Check } from 'lucide-react';
import { supabase, type Employee, type Attendance } from '../../lib/supabase';

export default function AttendanceManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
    loadAttendance();
  }, [selectedDate]);

  const loadEmployees = async () => {
    const { data } = await supabase
      .from('employees')
      .select('*')
      .eq('is_active', true)
      .order('name');
    if (data) setEmployees(data);
  };

  const loadAttendance = async () => {
    const { data } = await supabase
      .from('attendance')
      .select('*')
      .eq('date', selectedDate);
    if (data) setAttendance(data);
  };

  const markAttendance = async (
    employeeId: string,
    status: 'present' | 'absent' | 'late' | 'half_day' | 'leave'
  ) => {
    setLoading(true);
    try {
      const existingRecord = attendance.find((a) => a.employee_id === employeeId);

      if (existingRecord) {
        await supabase
          .from('attendance')
          .update({ status, check_in: status === 'present' ? new Date().toISOString() : null })
          .eq('id', existingRecord.id);
      } else {
        await supabase.from('attendance').insert({
          employee_id: employeeId,
          date: selectedDate,
          status,
          check_in: status === 'present' ? new Date().toISOString() : null,
        });
      }

      await loadAttendance();
    } catch (error) {
      console.error('Error marking attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceStatus = (employeeId: string) => {
    return attendance.find((a) => a.employee_id === employeeId);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-500';
      case 'late':
        return 'bg-yellow-500';
      case 'half_day':
        return 'bg-blue-500';
      case 'absent':
        return 'bg-red-500';
      case 'leave':
        return 'bg-purple-500';
      default:
        return 'bg-stone-600';
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-serif text-cream mb-8">Employee Attendance</h2>

      <div className="mb-6 flex items-center gap-4">
        <Calendar className="w-6 h-6 text-amber-500" />
        <div>
          <label className="block text-cream mb-2">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="bg-stone-900 border border-amber-900/20 rounded-xl p-8 text-center">
          <p className="text-cream/60">No employees found. Add employees first.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {employees.map((employee) => {
            const record = getAttendanceStatus(employee.id!);
            return (
              <div
                key={employee.id}
                className="bg-stone-900 border border-amber-900/20 rounded-xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-cream">{employee.name}</h3>
                    <p className="text-cream/60 text-sm">{employee.position}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {record?.check_in && (
                      <div className="flex items-center gap-2 text-cream/70">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(record.check_in).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                    {record && (
                      <span
                        className={`px-4 py-2 rounded-full text-white font-medium ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(['present', 'late', 'half_day', 'absent', 'leave'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => markAttendance(employee.id!, status)}
                      disabled={loading}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        record?.status === status
                          ? `${getStatusColor(status)} text-white`
                          : 'bg-stone-800 text-cream/70 hover:bg-stone-700'
                      }`}
                    >
                      {record?.status === status && <Check className="w-4 h-4 inline mr-1" />}
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
