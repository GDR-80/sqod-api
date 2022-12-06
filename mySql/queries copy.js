const queries = {
  getUsers: () => {
    return `SELECT * FROM users`;
  },

  getUser: () => {
    return `SELECT users.id, name, phone, email, user_type AS userType, users.entry_date FROM users
              JOIN logins
                ON users.id = logins.user_id
                  WHERE token = ?;`;
  },

  createUser: () => {
    return `INSERT IGNORE users 
                (name, email, phone, password, user_type)
                     VALUES
                        (?, ?, ?, ?, ?);`;
  },

  checkCreds: () => {
    return `SELECT id 
                FROM users
                    WHERE email = ? 
                      AND password = ?;
    `;
  },

  addToken: () => {
    return `INSERT INTO logins
                ( user_id, token )
                VALUES (?, ?);
                `;
  },

  checkToken: () => {
    return `SELECT user_id 
                FROM logins
                    WHERE token = ?;
                
                `;
  },

  removeToken: () => {
    return `DELETE FROM logins
                WHERE token = ?;
    `;
  },

  getChildren: () => {
    return `SELECT id, name, age, age_group AS ageGroup, team_id AS teamId, user_id AS userId, approved
                FROM children
                    WHERE children.user_id = ?`;
  },

  getTeams: () => {
    return `SELECT id, name, age_group AS ageGroup, team_badge AS teamBadge, address_id As addressId, user_id AS userId FROM teams;
             
  `;
  },

  getUserTeams: () => {
    return `SELECT id, name, age_group AS ageGroup, team_badge AS teamBadge, address_id AS addressId, user_id AS userId FROM teams
           WHERE user_id = ?;
  
  `;
  },

  deleteTeam: () => {
    return `DELETE teams
              FROM teams
                    WHERE teams.id = ?;`;
  },

  setApproved: () => {
    return `UPDATE children
              SET
                children.approved =?
                    WHERE children.id = ?;
                  `;
  },

  getFixtures: () => {
    return `SELECT id, UNIX_TIMESTAMP(meet_time) AS meetTime, UNIX_TIMESTAMP(kick_off_time) AS kickOffTime, home_team_id AS homeTeamId, away_team_id AS awayTeamId FROM fixtures;`;
  },

  /// KEEP FOR NOW

  // setUserType: () => {
  //   return `UPDATE users
  //              SET
  //                 users.user_type = ?
  //                     WHERE email = ?
  //                      AND password = ?;
  //                                   `;
  // },

  // ADD CHILD NOT WORKING

  addChild: () => {
    return `INSERT IGNORE children
                (name, age, age_group, user_id, team_id )
                  JOIN logins
                      ON users.id = logins.user_id
                        WHERE token = ?
                            VALUES
                               (?, ?, ?, ?, ?);`;
  },
};

module.exports = queries;
