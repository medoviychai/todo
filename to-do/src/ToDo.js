import React, { useState } from "react";
import dayjs from "dayjs";
import './ToDo.less';

/**
 * Функциональный компонент
 * @namespace ToDo
 */
export default function ToDo() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskFile, setTaskFile] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [isEditable, setIsEditable] = useState(null);
  const [taskArray, setTaskArray] = useState([]);
  const [updateInput, setUpdateInput] = useState("");
  const [updateTextarea, setUpdateTextarea] = useState("");

  /**
   * Предотвращает отправку формы при нажатии на кнопку
   * @param {object} e - объект, в котором содержится информация о событии 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  /**
   * Отслеживает и переписывает в state значение поля "Описание"
   * @param {object} e - объект, в котором содержится информация о событии 
   */
  const handleTextarea = (e) => {
    setTaskDescription(e.target.value);
  };

  /**
   * Отслеживает и переписывает в state значение поля "Задача"
   * @param {object} e - объект, в котором содержится информация о событии 
   */
  const handleInput = (e) => {
    setTaskName(e.target.value);
  };

  /**
   * Отслеживает и переписывает в state значение формы "Дата"
   * @param {object} e - объект, в котором содержится информация о событии 
   */
  const handleDate = (e) => {
    setTaskDate(e.target.value);
  };

  /**
   * Отслеживает и переписывает в state значение формы "Файл"
   * @param {object} e - объект, в котором содержится информация о событии 
   */
  const handleFile = (e) => {
    setTaskFile(e.target.value);
  };

    /**
   * Отслеживает и переписывает в state обновленное значение поля "Задача" в текущей задаче
   * @param {object} e - объект, в котором содержится информация о событии 
   */
  const handleUpdateInput = (e) => {
    setUpdateInput(e.target.value);
  };

  /**
   * Отслеживает и переписывает в state обновленное значение поля "Описание" в текущей задаче
   * @param {object} e - объект, в котором содержится информация о событии 
   */
  const handleUpdateTextarea = (e) => {
    setUpdateTextarea(e.target.value);
  };

/**
 * Добавляет задачу в общий список при условии, что хотя бы поле "Задача" заполнено. В противном случае выводит модальное окно с просьбой ввести заголовок задачи
 */
  const addTask = () => {
    if (!taskName || taskName === " ") {
      alert("Введите задачу");
    } else {
      const taskObj = {
        taskName: taskName,
        taskDescription: taskDescription,
        taskFile: taskFile,
        taskDate: taskDate,
      };
      setTaskArray([...taskArray, taskObj]);
    }
    setTaskName("");
    setTaskDescription("");
    setTaskDate("");
    setTaskFile("");
  };

  /**
   * Удаляет задачу при нажатии на соответствующий значок по ее порядковому номеру в массиве
   * @param {number} index - порядковый номер текущей (нажатой) задачи 
   */
  const deleteTask = (index) => {
    const taskArrayClone = [...taskArray];
    taskArrayClone.splice(index, 1);
    setTaskArray(taskArrayClone);
  };

  /**
   * Сравнивает текущую дату и дату выполнения, указанную в задаче.
   * @param {string} taskDate - дата выполнения, указанная при добавлении задачи в список 
   * @returns {boolean} - true, если дата в задаче маньше текущей даты, и наоборот.
   */
  const checkDate = (taskDate) => {
    const fullCurrentDate = dayjs();
    const currentDate = fullCurrentDate
      .format()
      .split("")
      .splice(0, 10)
      .join("");

    const TDate = new Date(taskDate);
    const CDate = new Date(currentDate);

    return TDate < CDate;
  };

  /**
   * Отображает поля для изменения задачи и скрывает их при повторном нажатии на соответствующий значок, сохраняя новые значения полей "Задача" и "Описание".
   * @param {number} index - порядковый номер задачи 
   */
  const updateTask = (index) => {
    if (isEditable === index) {
      setIsEditable(null);

      const taskArrayClone = [...taskArray];
      if (updateInput !== "") {
        taskArrayClone[index].taskName = updateInput;
      }
      if (updateTextarea !== "") {
        taskArrayClone[index].taskDescription = updateTextarea;
      }
      setTaskArray(taskArrayClone);
    } else {
      setIsEditable(index);
    }
  };

  return (
    <div className="todo">
      <h1 className="title">To do</h1>
      <div className="todo-box">
        <div>
          <form className="add-task" onSubmit={handleSubmit}>
            <div className="task-inputs">
              <input
                className="title-input"
                value={taskName}
                onInput={handleInput}
                placeholder="Задача"
              />
              <textarea
                className="description-textarea"
                value={taskDescription}
                onChange={handleTextarea}
                placeholder="Описание"
              />
              <label className="change-date">
                Дата завершения
                <input
                  value={taskDate}
                  onChange={handleDate}
                  type="date"
                  name="calendar"
                />
              </label>
            </div>
            <label>
              <input
                className="file-input"
                value={taskFile}
                onChange={handleFile}
                type="file"
              />
              <img
                className="clip-image"
                src="https://cdn-icons-png.flaticon.com/512/889/889662.png"
                alt="clip"
              ></img>
            </label>
            <button className="add-task-button" onClick={addTask}>
              <img
                className="btn-image"
                src="https://cdn-icons-png.flaticon.com/512/2732/2732649.png"
                alt="plus"
              ></img>
            </button>
          </form>
        </div>

        {taskArray.length !== 0 ? (
          taskArray.map((item, index) => (
            <div className="task-item">
              <div className="main-task-info">
                {isEditable === index ? (
                  <input value={updateInput} onInput={handleUpdateInput} />
                ) : (
                  <label className="task-name">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <h3>{item.taskName}</h3>
                  </label>
                )}

                <div className="aside-icons">
                  <img
                    className="change-task"
                    onClick={() => {
                      updateTask(index);
                    }}
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828918.png"
                    alt="change-task"
                  ></img>
                  <img
                    className="delete-task"
                    onClick={(index) => {
                      deleteTask(index);
                    }}
                    src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                    alt="delete-task"
                  ></img>
                </div>
              </div>
              <div className="task-description">
                {isEditable === index ? (
                  <textarea
                    value={updateTextarea}
                    onChange={handleUpdateTextarea}
                    style={{ resize: "none", fontFamily: "Manrope" }}
                  />
                ) : (
                  <p className="description">{item.taskDescription}</p>
                )}
                {item.taskFile !== "" ? (
                  <a className="files" href={taskFile}>
                    Вложения
                  </a>
                ) : (
                  <span></span>
                )}
                {checkDate(item.taskDate) ? (
                  <p
                    className="date"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {item.taskDate}
                  </p>
                ) : (
                  <p className="date">{item.taskDate}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>Пока здесь нет задач</div>
        )}
      </div>
    </div>
  );
}
