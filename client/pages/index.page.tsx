import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { TaskEntity } from 'api/@types/task';
import { Amplify } from 'aws-amplify';
import { Loading } from 'components/Loading/Loading';
import { BasicHeader } from 'pages/@components/BasicHeader/BasicHeader';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import { returnNull } from 'utils/returnNull';
import awsConfig from '../src/aws-exports';
import styles from './index.module.css';

Amplify.configure({
  Auth: {
    Cognito: {
      identityPoolId: 'localhost:31577:fake',
      // overwrite the endpoint to local server
      userPoolEndpoint: 'http://127.0.0.1:31577/api/auth',
      allowGuestAccess: true,
      userAttributes: {
        email: {
          required: true,
        },
      },
      userPoolClientId: 'localhost:31577:fake',
      userPoolId: awsConfig.aws_user_pools_id,
      mfa: {
        status: 'off',
        totpEnabled: false,
        smsEnabled: true,
      },
      loginWith: {
        username: true,
        email: false,
        phone: false,
      },
    },
  },
});

// Amplify.configure(awsConfig);

const Home = ({ signOut, user }: WithAuthenticatorProps) => {
  const [tasks, setTasks] = useState<TaskEntity[]>();
  const [label, setLabel] = useState('');
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };
  const createTask = async (e: FormEvent) => {
    e.preventDefault();

    await apiClient.tasks.post({ body: { label } }).catch(returnNull);
    setLabel('');
    await fetchTasks();
  };
  const toggleDone = async (task: TaskEntity) => {
    await apiClient.tasks
      ._taskId(task.id)
      .patch({ body: { done: !task.done } })
      .catch(returnNull);
    await fetchTasks();
  };
  const deleteTask = async (task: TaskEntity) => {
    await apiClient.tasks._taskId(task.id).delete().catch(returnNull);
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!tasks) return <Loading visible />;

  return (
    <>
      <BasicHeader />
      <div className={styles.container}>
        <div className={styles.title}>Welcome to frourio!</div>
        <h2>hi! {user?.username}</h2>
        <button onClick={signOut}>Sign out</button>
        <div className={styles.main}>
          <div className={styles.card}>
            <form onSubmit={createTask}>
              <div className={styles.controls}>
                <input
                  value={label}
                  className={styles.textInput}
                  type="text"
                  placeholder="Todo task"
                  onChange={inputLabel}
                />
                <input className={styles.btn} disabled={label === ''} type="submit" value="ADD" />
              </div>
            </form>
          </div>
          {tasks.map((task) => (
            <div key={task.id} className={styles.card}>
              <div className={styles.controls}>
                <input type="checkbox" checked={task.done} onChange={() => toggleDone(task)} />
                <span>{task.label}</span>
                <input
                  type="button"
                  value="DELETE"
                  className={styles.btn}
                  onClick={() => deleteTask(task)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default withAuthenticator(Home);
