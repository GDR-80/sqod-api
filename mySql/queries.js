const queries = {
  getUsers: () => {
    return `SELECT * FROM users`;
  },

  getUser: () => {
    return `SELECT users.id, name, email, user_type, users.entry_date FROM users
              JOIN logins
                ON users.id = logins.user_id
                  WHERE token = ?;`;
  },

  createUser: () => {
    return `INSERT IGNORE users 
                (name, email, phone, password, userType)
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

  getChildren: () => {
    return `SELECT id, name, age, age_group, team_id, approved
                FROM children
                    WHERE user_id = ?`;
  },

  getTeam: () => {
    return `SELECT * FROM teams;
             
  `;
  },

  getUserTeams: () => {
    return `SELECT id FROM teams
           WHERE user_id = ?;
  
  `;
  },

  // setUserType: () => {
  //   return `UPDATE users
  //              SET
  //                 users.user_type = ?
  //                     WHERE email = ?
  //                      AND password = ?;
  //                                   `;
  // },

  getManagerProfile: () => {
    return `SELECT users.name, users.email, users.phone, users.user_type, teams.name AS team_name, teams.age_group, teams.id AS team_id FROM users
              JOIN teams
                  ON teams.user_id = users.id
                      JOIN logins
                          ON users.id = logins.user_id
                              WHERE token = ?;`;
  },

  getParentProfile: () => {
    return `SELECT users.name, users.email, users.phone, users.user_type, teams.name AS team_name, teams.age_group, teams.id AS team_id, children.name AS child FROM users
                JOIN children
                    ON users.id = children.user_id
                       JOIN teams
                          ON teams.id = children.team_id
                              JOIN logins
                                  ON users.id = logins.user_id
                                      WHERE token = ?;`;
  },

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

  test: () => {
    return `SELECT users.name, teams.name, age_group FROM users
                JOIN teams
                      ON users.id = teams.user_id 
                        WHERE users.id = ?;
                      `;
  },
};

module.exports = queries;

// SELECT teams.name AS homeTeam, users.name, meet_time, kick_off_time From teams
// JOIN users
// 	ON users.id = teams.user_id
// 		JOIN fixtures
// 			ON teams.id = home_team_id
//             	WHERE user_id = 1;

// SELECT userHome.name AS homeTeamManager, userAway.name AS awayTeamManager, homeTeam.name AS homeTeam, awayTeam.name AS awayTeam, fixtures.meet_time, fixtures.kick_off_time FROM fixtures
// 	JOIN teams AS homeTeam
//     ON homeTeam.id = fixtures.home_team_id
//     JOIN teams AS awayTeam
//     ON awayTeam.id = fixtures.away_team_id
//     JOIN users AS userHome

// SELECT users.name, phone, email, teams.name, fixtures.meet_time FROM users
// 	JOIN teams
//         ON teams.id = user_id
//             JOIN fixtures
//                 ON home_team_id = teams.id
//                     Where users.id = teams.user_id;
