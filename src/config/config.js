const config_network = {
  // "host": "https://smartfarm.tinasoft.com.vn",
  // "port": "443",
  host: "http://localhost",
  port: "8001",
};
const config_public = {
  //   ip: "http://smartfarm.tinasoft.com.vn:8001",
};
const config_socket = {
  // ip: "https://smartfarm.tinasoft.com.vn:443",
  ip: "http://localhost:8001",
};

const api_path = config_network.host + ":" + config_network.port + "/api/v1/";

const config_api = {
  path: api_path,
  // Auth
  signin: api_path + "auth",
  register: api_path + "auth/register",
  verify: api_path + "auth/verify",
  refresh: api_path + "auth/refresh",
  forgot_password: api_path + "auth/recovery",
  // project
  project: api_path + "information",
  // list seeds
  seed: api_path + "seeds",
  // list gateways
  gateway: api_path + "seeds/gateway",
  // Getdata
  data: api_path + "data",
  //Task
  task: api_path + "tasks",
  task_status: api_path + "task-statuses",
  task_attachments: api_path + "tasks/attachments",
  // Admin
  admin: api_path + "users",
  // Notification
  notification: api_path + "web-notifications",
  // member
  memberships: api_path + "memberships",
  roles: api_path + "roles",
  // Camera
  camera: api_path + "camera",
};

module.exports = {
  config_network: config_network,
  config_api: config_api,
  config_public: config_public,
  config_socket: config_socket,
};
