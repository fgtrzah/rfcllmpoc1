React hook for GH OAuth2

```typescript
// src/useGitHubAuth.ts
import { useState, useEffect } from 'react';

const GITHUB_CLIENT_ID = '<YOUR_CLIENT_ID>';
const GITHUB_REDIRECT_URI = 'http://localhost:3000/callback';

export const useGitHubAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('githubAccessToken'));
  const [error, setError] = useState<string | null>(null);

  const authenticateWithGitHub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user`;
  };

  const handleAuthentication = async (code: string) => {
    try {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET, // Make sure to securely store this
          code,
          redirect_uri: GITHUB_REDIRECT_URI,
        }),
      });

      if (!response.ok) {
        throw new Error('Error authenticating with GitHub');
      }

      const data = await response.json();
      const token = data.access_token;

      if (token) {
        setAccessToken(token);
        localStorage.setItem('githubAccessToken', token);
        setError(null);
      } else {
        throw new Error('Unable to authenticate');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('githubAccessToken');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  return { accessToken, error, authenticateWithGitHub, handleAuthentication };
};

```

App.tsx interim but will move to useOctoKit

```typescript
// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Callback from './Callback';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/callback">
          <Callback />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <AuthHandler />
        </Route>
      </Switch>
    </Router>
  );
};

const AuthHandler: React.FC = () => {
  const accessToken = localStorage.getItem('githubAccessToken');

  if (accessToken) {
    // Token exists, render authenticated content
    return <AuthenticatedContent />;
  } else {
    // Token does not exist, redirect to login
    return <Redirect to="/login" />;
  }
};

const AuthenticatedContent: React.FC = () => {
  return <div>Authenticated Content Here</div>;
};

export default App;
```

Login page
```typescript
// Login.tsx
import React from 'react';
import { useGitHubAuth } from './useGitHubAuth';

const Login: React.FC = () => {
  const { authenticateWithGitHub } = useGitHubAuth();

  return (
    <div>
      <h1>Login with GitHub</h1>
      <button onClick={authenticateWithGitHub}>Login with GitHub</button>
    </div>
  );
};

export default Login;
```

Callback catch page
```typescript
// Callback.tsx
import React from 'react';
import { Redirect } from 'react-router-dom';

const Callback: React.FC = () => {
  return <Redirect to="/" />;
};

export default Callback;
```

Finalized App.tsx
```typescript
// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Callback from './Callback';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/callback">
          <Callback />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
```

Chat widget new controls:
![cw](https://github.com/fgtrzah/rfcllmpoc1/blob/main/chatwidget.png?raw=true)
