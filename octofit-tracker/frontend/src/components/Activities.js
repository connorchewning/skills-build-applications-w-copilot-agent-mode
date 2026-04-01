import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Fetching activities from:', baseUrl);
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [baseUrl]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Activity</th>
                <th>Duration (min)</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a, i) => (
                <tr key={a.id || i}>
                  <td>{i + 1}</td>
                  <td>{a.activity}</td>
                  <td>{a.duration}</td>
                  <td>{a.user || a.user_email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Example Bootstrap button */}
        <button className="btn btn-primary mt-3" type="button" data-bs-toggle="modal" data-bs-target="#activityModal">
          Show Modal
        </button>
        {/* Example Bootstrap modal */}
        <div className="modal fade" id="activityModal" tabIndex="-1" aria-labelledby="activityModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="activityModalLabel">Activity Modal</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                This is a sample Bootstrap modal for Activities.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
