function KanbanBoard({
  applications,
  setApplications,
}) {

  const columns = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
  ];

  // Start dragging
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData(
      "applicationIndex",
      index
    );
  };

  // Allow dropping
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Drop application
  const handleDrop = (e, newStatus) => {

    const index = Number(
      e.dataTransfer.getData(
        "applicationIndex"
      )
    );

    const updatedApplications = [
      ...applications,
    ];

    updatedApplications[index] = {
      ...updatedApplications[index],
      status: newStatus,
    };

    setApplications(updatedApplications);
  };

  return (
    <div className="kanban-board">

      {columns.map((column) => {

        const columnApplications =
          applications.filter(
            (application) =>
              application.status === column
          );

        return (
          <div
            className="kanban-column"
            key={column}
            onDragOver={handleDragOver}
            onDrop={(e) =>
              handleDrop(e, column)
            }
          >

            {/* Column Header */}

            <div className="kanban-header">

              <h3>{column}</h3>

              <span>
                {columnApplications.length}
              </span>

            </div>

            {/* Cards */}

            <div className="kanban-cards">

              {columnApplications.length > 0 ? (

                columnApplications.map(
                  (application) => {

                    const originalIndex =
                      applications.indexOf(
                        application
                      );

                    return (

                      <div
                        className="kanban-card"
                        key={originalIndex}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(
                            e,
                            originalIndex
                          )
                        }
                      >

                        <div className="card-top">

                          <h4>
                            {application.company}
                          </h4>

                          <span className="drag-icon">
                            ⋮⋮
                          </span>

                        </div>

                        <p className="job-title">
                          {application.position}
                        </p>

                        <p className="job-location">
                          📍 {application.location}
                        </p>

                        <div className="card-footer">

                          <span>
                            📅 {application.date}
                          </span>

                        </div>

                      </div>

                    );
                  }
                )

              ) : (

                <div className="empty-column">
                  Drop applications here
                </div>

              )}

            </div>

          </div>
        );

      })}

    </div>
  );
}

export default KanbanBoard;