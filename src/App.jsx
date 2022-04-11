import { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [employee, setEmployee] = useState({});
  const [employees, setEmployees] = useState([]);

  const [editName, setEditName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editSalary, setEditSalary] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [createName, setCreateName] = useState("");
  const [createLastName, setCreateLastName] = useState("");
  const [createSalary, setCreateSalary] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createOccupation, setCreateOccupation] = useState("");
  const [createDependency, setCreateDependency] = useState("");
  const [createJoinedDate, setCreateJoinedDate] = useState("");
  const [createOffice, setCreateOffice] = useState("");
  const [createAge, setCreateAge] = useState("");

  const editRef = useRef(null);
  const createRef = useRef(null);

  const getEmployees = useCallback(async () => {
    const results = await axios.get(
      "https://guarded-temple-02873.herokuapp.com/employees/all"
    );
    setEmployees(results.data);
  }, []);

  useEffect(() => {
    editRef.current.style.display = "none";
    getEmployees();
  }, []);

  const onCheckClick = (id) => {
    axios
      .post(
        `https://guarded-temple-02873.herokuapp.com/employees/${id}/updateSalary`
      )
      .then(() => {
        alert("Salario actualizado");
        getEmployees();
      })
      .catch((err) => {
        console.log(err);
        alert("No se puede actualizar el salario");
      });
  };

  const onEditClick = (employee) => {
    setEmployee(employee);
    editRef.current.style.display = "flex";
  };

  const onDeleteClick = async (id) => {
    axios
      .delete(
        `https://guarded-temple-02873.herokuapp.com/employees/delete/${id}`
      )
      .then(() => {
        alert("Empleado eliminado");
        setEmployees(employees.filter((employee) => employee.id !== id));
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      });
    getEmployees();
  };

  const onUpdateClick = async () => {
    const body = {
      ...employee,
      firstName: editName || employee.firstName,
      lastName: editLastName || employee.lastName,
      email: editEmail || employee.email,
      salary: editSalary || employee.salary,
    };
    await axios.put(
      "https://guarded-temple-02873.herokuapp.com/employees/update",
      body
    );
    getEmployees();
    setEditName("");
    setEditLastName("");
    setEditSalary("");
    setEditEmail("");
    editRef.current.style.display = "none";
  };

  const onCreateClick = async () => {
    const body = {
      firstName: createName,
      lastName: createLastName,
      email: createEmail,
      salary: createSalary,
      occupation: createOccupation,
      office: createOffice,
      dependency: createDependency,
      joinedDate: createJoinedDate + "T00:00:00",
      age: createAge,
    };
    await axios.post(
      "https://guarded-temple-02873.herokuapp.com/employees/create",
      body
    );
    setCreateName("");
    setCreateLastName("");
    setCreateSalary("");
    setCreateEmail("");
    setCreateOccupation("");
    setCreateDependency("");
    setCreateJoinedDate("");
    setCreateOffice("");
    setCreateAge("");
    getEmployees();
  };

  return (
    <div className="App">
      <div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Fecha de Ingreso</th>
              <th>Salario</th>
              <th>Revisar aumento</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    {employee.joinedDate
                      .toString()
                      .substring(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </td>
                  <td>{employee.salary}</td>
                  <td>
                    <button onClick={() => onCheckClick(employee.id)}>
                      Revisar salario
                    </button>
                  </td>
                  <td>
                    <button onClick={() => onEditClick(employee)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button onClick={() => onDeleteClick(employee.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div ref={editRef} className="edit">
        <div className="edit-div">
          <label htmlFor="first">Nombre</label>
          <input
            type="text"
            id="first"
            value={editName}
            autoComplete="off"
            onChange={(e) => setEditName(e.target.value)}
          />
        </div>
        <div className="edit-div">
          <label htmlFor="last">Apellido</label>
          <input
            type="text"
            id="last"
            value={editLastName}
            autoComplete="off"
            onChange={(e) => setEditLastName(e.target.value)}
          />
        </div>
        <div className="edit-div">
          <label htmlFor="salary">Salario</label>
          <input
            type="text"
            id="salary"
            value={editSalary}
            autoComplete="off"
            onChange={(e) => setEditSalary(e.target.value)}
          />
        </div>
        <div className="edit-div">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={editEmail}
            autoComplete="off"
            onChange={(e) => setEditEmail(e.target.value)}
          />
        </div>
        <div>
          <button onClick={onUpdateClick}>Actualizar</button>
        </div>
      </div>
      <div ref={createRef}>
        <div className="edit">
          <div className="edit-div">
            <label htmlFor="first">Nombre</label>
            <input
              type="text"
              id="first"
              value={createName}
              autoComplete="off"
              onChange={(e) => setCreateName(e.target.value)}
            />
          </div>
          <div className="edit-div">
            <label htmlFor="last">Apellido</label>
            <input
              type="text"
              id="last"
              value={createLastName}
              autoComplete="off"
              onChange={(e) => setCreateLastName(e.target.value)}
            />
          </div>
          <div className="edit-div">
            <label htmlFor="salary">Salario</label>
            <input
              type="text"
              id="salary"
              value={createSalary}
              autoComplete="off"
              onChange={(e) => setCreateSalary(e.target.value)}
            />
          </div>
          <div className="edit-div">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={createEmail}
              autoComplete="off"
              onChange={(e) => setCreateEmail(e.target.value)}
            />
          </div>
          <div className="edit-div">
            <label htmlFor="first">Cargo</label>
            <input
              type="text"
              id="first"
              value={createOccupation}
              autoComplete="off"
              onChange={(e) => setCreateOccupation(e.target.value)}
            />
          </div>
          <div className="edit-div">
            <label htmlFor="first">Dependencia</label>
            <input
              type="text"
              id="first"
              value={createDependency}
              autoComplete="off"
              onChange={(e) => setCreateDependency(e.target.value)}
            />
          </div>
          <div className="edit-div">
            <label htmlFor="first">Fecha ingreso</label>
            <input
              type="date"
              id="first"
              value={createJoinedDate}
              autoComplete="off"
              onChange={(e) => setCreateJoinedDate(e.target.value)}
            />
          </div>
          <div className="edit-div">
            <label htmlFor="first">Oficina</label>
            <input
              type="text"
              id="first"
              value={createOffice}
              autoComplete="off"
              onChange={(e) => setCreateOffice(e.target.value)}
            />
          </div>
          <div className="edit-div">
            <label htmlFor="first">Edad</label>
            <input
              type="number"
              id="first"
              value={createAge}
              autoComplete="off"
              onChange={(e) => setCreateAge(e.target.value)}
            />
          </div>
          <div>
            <button onClick={onCreateClick}>Crear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
