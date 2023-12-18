const { db } = require("../mysql/db");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    Users() {
      const q = "SELECT * FROM `chatauth`";
      return new Promise(async (resolve, reject) => {
        try {
          const data = await new Promise((innerResolve, innerReject) => {
            db.query(q, (err, result) => {
              if (err) {
                innerReject(err);
              } else {
                innerResolve(result);
              }
            });
          });

          if (data.length === 0) {
            resolve(null);
          } else {
            const users = data?.map((user) => ({
              id: user.a_id,
              username: user.a_username,
              name: user.a_name,
              email: user.a_email,
              password: user.a_password,
              image: user.a_image,
            }));
            resolve(users);
          }
        } catch (error) {
          console.error(`Error fetching users: ${error.message}`);
          reject(new Error("Something went wrong. Please try again later."));
        }
      });
    },

    getSingleUser(parent, args) {
      const q = "SELECT * FROM `chatauth` WHERE `a_username`=?";
      const username = args.username;

      return new Promise(async (resolve, reject) => {
        try {
          const data = await new Promise((innerResolve, innerReject) => {
            db.query(q, [username], (err, result) => {
              if (err) {
                innerReject(err);
              } else {
                innerResolve(result);
              }
            });
          });

          if (data.length === 0) {
            resolve(null);
          } else {
            const user = data[0];
            const result = {
              id: user.a_id,
              username: user.a_username,
              name: user.a_name,
              email: user.a_email,
              password: user.a_password,
              image: user.a_image,
            };
            resolve(result);
          }
        } catch (error) {
          console.error(`Error fetching single user: ${error.message}`);
          reject(new Error("Something went wrong. Please try again later."));
        }
      });
    },

    senderMessages(parent, args) {
      const q =
        "SELECT * FROM `chatmessages` WHERE `sender_id`=? AND `receiver_id`=?";
      const input = args.input;
      const values = [input.sender_id, input.receiver_id];

      return new Promise(async (resolve, reject) => {
        try {
          const data = await new Promise((innerResolve, innerReject) => {
            db.query(q, values, (err, result) => {
              if (err) {
                innerReject(err);
              } else {
                innerResolve(result);
              }
            });
          });

          const array = [];
          data?.map((data) => {
            const results = {
              message_id: data.message_id,
              sender_id: data.sender_id,
              receiver_id: data.receiver_id,
              message_text: data.message_text,
              sent_at: data.sent_at,
            };
            return array.push(results);
          });

          resolve(array);
        } catch (error) {
          console.error(`Error fetching sender messages: ${error.message}`);
          reject(new Error("Something went wrong. Please try again later."));
        }
      });
    },

    receiverMessages(parent, args) {
      const q =
        "SELECT * FROM `chatmessages` WHERE `receiver_id`=? AND `sender_id`=?";
      const input = args.input;
      const values = [input.receiver_id, input.sender_id];

      return new Promise(async (resolve, reject) => {
        try {
          const data = await new Promise((innerResolve, innerReject) => {
            db.query(q, values, (err, result) => {
              if (err) {
                innerReject(err);
              } else {
                innerResolve(result);
              }
            });
          });

          const array = [];
          data?.map((data) => {
            const results = {
              message_id: data.message_id,
              sender_id: data.sender_id,
              receiver_id: data.receiver_id,
              message_text: data.message_text,
              sent_at: data.sent_at,
            };
            return array.push(results);
          });

          resolve(array);
        } catch (error) {
          console.error(`Error fetching receiver messages: ${error.message}`);
          reject(new Error("Something went wrong. Please try again later."));
        }
      });
    },
  },
  Mutation: {
    async create(parent, args) {
        const q =
            "INSERT INTO `chatauth` (`a_name`, `a_username`, `a_email`, `a_password`) VALUES (?,?,?,?)";
        const input = args.input;
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const values = [input.name, input.username, input.email, hashedPassword];
    
        try {
            if (input.name && input.username && input.email && input.password) {
                const data = await new Promise((resolve, reject) => {
                    db.query(q, values, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
                return true; // Assuming success
            } else {
                throw new Error("Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error(`Error creating user: ${error.message}`);
            throw new Error("Something went wrong. Please try again later.");
        }
    },
    
    async login(parent, args) {
        const q = "SELECT * FROM `chatauth` WHERE `a_username`=?";
        const input = args.input;
    
        try {
            if (input.username) {
                const userData = await new Promise((resolve, reject) => {
                    db.query(q, [input.username], (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
    
                if (userData && userData.length > 0) {
                    const passwordMatch = await bcrypt.compare(
                        input.password,
                        userData[0].a_password
                    );
                    if (passwordMatch) {
                        return userData;
                    } else {
                        throw new Error("Wrong password");
                    }
                } else {
                    throw new Error("User not found");
                }
            } else {
                throw new Error("You entered a wrong username or password");
            }
        } catch (error) {
            console.error(`Login failed: ${error.message}`);
            throw new Error(`Login failed: ${error.message}`);
        }
    },
    
    async resetPassword(parent, args) {
        const q =
            "UPDATE `chatauth` SET `a_password`=? WHERE `a_username`=? AND `a_email`=?";
        const input = args.input;
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const values = [hashedPassword, input.username, input.email];
    
        try {
            if (input.email && input.username && input.password) {
                const data = await new Promise((resolve, reject) => {
                    db.query(q, values, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
                return data;
            } else {
                throw new Error("You entered an incorrect email or username");
            }
        } catch (error) {
            console.error(`Error resetting password: ${error.message}`);
            throw new Error("Something went wrong. Please try again later.");
        }
    },
    
    async resetUsername(parent, args) {
        const q =
            "UPDATE `chatauth` SET `a_username`=? WHERE `a_email`=? AND `a_password`=?";
        const hashedPassword =
            "SELECT `a_password` FROM `chatauth` WHERE `a_email`=?";
        const input = args.input;
    
        try {
            if (input.email && input.password && input.username) {
                const values = [input.email];
                const data = await new Promise((resolve, reject) => {
                    db.query(hashedPassword, values, async (err, result) => {
                        if (err) {
                            reject(err);
                        } else if (result) {
                            const password = String(result[0].a_password);
                            const match = await bcrypt.compare(
                                input.password,
                                password
                            );
                            if (match) {
                                const updateValues = [
                                    input.username,
                                    input.email,
                                    password,
                                ];
                                db.query(q, updateValues, (err, updateResult) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(updateResult);
                                    }
                                });
                            } else {
                                throw new Error("Error: Password is incorrect");
                            }
                        } else {
                            resolve(result);
                        }
                    });
                });
                return data;
            } else {
                throw new Error("You entered an incorrect email or password");
            }
        } catch (error) {
            console.error(`Error updating username: ${error.message}`);
            throw new Error("Something went wrong. Please try again later.");
        }
    },
    
    async resetEmail(parent, args) {
        const q =
            "UPDATE `chatauth` SET `a_email`=? WHERE `a_username`=? AND `a_password`=?";
        const hashedPassword =
            "SELECT `a_password` FROM `chatauth` WHERE `a_username`=?";
        const input = args.input;
    
        try {
            if (input.username && input.password && input.email) {
                const values = [input.username];
                const data = await new Promise((resolve, reject) => {
                    db.query(hashedPassword, values, async (err, result) => {
                        if (err) {
                            reject(err);
                        } else if (result) {
                            const password = String(result[0].a_password);
                            const match = await bcrypt.compare(
                                input.password,
                                password
                            );
                            if (match) {
                                const updateValues = [
                                    input.email,
                                    input.username,
                                    password,
                                ];
                                db.query(q, updateValues, (err, updateResult) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(updateResult);
                                    }
                                });
                            }
                        }
                    });
                });
                return data;
            } else {
                throw new Error("You entered an incorrect username or password");
            }
        } catch (error) {
            console.error(`Error updating email: ${error.message}`);
            throw new Error("Something went wrong. Please try again later.");
        }
    },
    async delete(parent, args) {
        const q = "DELETE FROM `chatauth` WHERE `a_email`=? AND `a_password`=?";
        const input = args.input;
    
        try {
            if (input.email && input.password) {
                const values = [input.email, input.password];
                const data = await new Promise((resolve, reject) => {
                    db.query(q, values, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
                return data;
            } else {
                throw new Error("You entered an incorrect email or password");
            }
        } catch (error) {
            console.error(`Error deleting user: ${error.message}`);
            throw new Error("Something went wrong. Please try again later.");
        }
    },
    
    async messages(parent, args) {
        const q =
            "INSERT INTO `chatmessages` (`sender_id`, `receiver_id`, `message_text`) VALUES (?,?,?)";
        const input = args.input;
    
        try {
            const values = [input.sender_id, input.receiver_id, input.message_text];
            const data = await new Promise((resolve, reject) => {
                db.query(q, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            return data;
        } catch (error) {
            console.error(`Error creating message: ${error.message}`);
            throw new Error("Something went wrong. Please try again later.");
        }
    }
    
    //SOON!!!
    // async changeImage(parent, args) {
    //   const q = "UPDATE `chatauth` SET `a_image`=? WHERE `a_username`=?";
    //   const input = args.input;

    //   return new Promise((resolve, reject) => {
    //     const values = [input.image, input.username];
    //     console.log(values);
    //     db.query(q, values, (err, data) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve(data);
    //       }
    //     });
    //   });
    // },
  },
};
module.exports = {resolvers};
