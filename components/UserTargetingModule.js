import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import ReactTooltip from 'react-tooltip';
import { nanoid } from 'nanoid';
import { useModule } from '../hooks/useModule';
import lmStyle from './css/LearningModule.module.css';
import style from './css/UserTargetingModule.module.css';

export default function UserTargetingModule({ moduleId }) {
  const [ randomId, _ ] = useState(nanoid());
  const [ users, setUsers ] = useState([]);
  const { mod } = useModule(moduleId, successHandler, errorHandler, randomId);

  function successHandler() {
    setUsers(mod.users);
  }

  function errorHandler(err) {
    console.error(err);
  }

  function formatContext(ctx) {
    let str = '';
    Object.keys(ctx)
      .filter(key => {
        return key !== 'custom';})
      .forEach(key => {
        str += key + ': ';
        str += ctx[key];
        str += '<br/>';
      });
    Object.keys(ctx.custom).forEach(key => {
      str += key + ': ';
      str += ctx.custom[key];
      str += '<br/>';
    });

    return str;
  }

  return (
    <>
    <div className={lmStyle.learningModule} style={{minHeight: '220px'}}>
      <div className={style.container}>
      { users.length == 0 && <p className={style.loading}>Fetching user data...</p>}
      {users && users.map(user => (
        <div className={`${style.iconWrapper} ${style.userIcon}`} 
        key={user.context.key}
        data-tip={formatContext(user.context)}
        data-multiline={true}
        data-event-off={'click'}
        >
          <UserCircleIcon className={
            `${style.user} ${user.variation ? style.userTrue : style.userFalse}`
          }/>
          <p className={user.variation ? style.userTrue : style.userFalse}
             style={{ marginTop: 0 }}
             >
            {user.variation.toString()}
          </p>
          <ReactTooltip/>
        </div>
      ))}
      </div>
    </div>
    </>
  )
}
