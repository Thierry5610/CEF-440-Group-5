project-root/
├── src/
│   ├── config/
│   │   ├── db.js                  # Database connection
│   │   ├── socket.js              # Socket.IO setup
│   │   └── env.js                 # Load environment variables
│   │
│   ├── constants/
│   │   ├── roles.js               # User roles
│   │   ├── messages.js            # Static messages
│   │   └── statusCodes.js         # HTTP status codes
│   │
│   ├── controllers/
│   │   ├── auth.controller.js     # Login, register, logout
│   │   ├── alert.controller.js    # Alert handling
│   │   ├── report.controller.js   # Crowd report logic
│   │   ├── location.controller.js # GPS and location updates
│   │   └── user.controller.js     # Profile, preferences
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js     # JWT verification
│   │   ├── error.middleware.js    # Error handler
│   │   └── validate.middleware.js # Validation schemas
│   │
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Alert.js               # Alert schema
│   │   ├── Report.js              # Report schema
│   │   ├── Location.js            # Location schema
│   │   └── Preferences.js         # User preferences schema
│   │
│   ├── routes/
│   │   ├── auth.routes.js         # /api/auth
│   │   ├── alert.routes.js        # /api/alerts
│   │   ├── report.routes.js       # /api/reports
│   │   ├── location.routes.js     # /api/location
│   │   └── user.routes.js         # /api/users
│   │
│   ├── services/
│   │   ├── auth.service.js        # Auth logic (JWT, password hash)
│   │   ├── alert.service.js       # Alert processing and prioritization
│   │   ├── report.service.js      # Report validation/storage
│   │   ├── location.service.js    # GPS handling and updates
│   │   └── notification.service.js# Voice/SMS/Push notifications
│   │
│   ├── sockets/
│   │   └── alert.socket.js        # Real-time alert emitter via Socket.IO
│   │
│   ├── jobs/
│   │   └── syncWeather.job.js     # Periodic fetch from weather/traffic APIs
│   │
│   ├── templates/
│   │   └── notification.html      # Optional: email or alert templates
│   │
│   ├── utils/
│   │   ├── apiClient.js           # Axios wrapper for external APIs
│   │   ├── logger.js              # Logging utility (e.g., Winston)
│   │   └── helpers.js             # Formatters, converters, etc.
│   │
│   ├── app.js                     # Initialize app, use middlewares and routes
│   └── server.js                  # Entry point (start server + socket)
│
├── .env                           # Environment variables
├── .gitignore                     # Ignore node_modules, etc.
├── package.json                   # NPM project info
├── README.md                      # Project documentation




#For production i will change you to waywatches frontend (socket.js)(Use .env to adjust)
#ALLOWED_ORIGINS=(Put the frontend url here)(found in .env)