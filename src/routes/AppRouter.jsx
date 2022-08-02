import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { HOME_PAGE } from '../consts/consts';
import { artistRoutes, publicRoutes } from './routes';

const AppRouter = () => {

  return (
    <Routes>
        {publicRoutes.map(({path, element}) => 
            <Route key={path} path={path} element={element} />
        )}
        {artistRoutes.map(({path, element}) => 
            <Route key={path} path={path} element={element} />
        )}
        <Route path="*" element={<Navigate replace to={HOME_PAGE} />} />
    </Routes>
  )
}

export default AppRouter