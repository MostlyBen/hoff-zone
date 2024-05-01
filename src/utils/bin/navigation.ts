import Router from "next/router";
// import { redirect } from 'next/navigation';

const help = `Usage: sci [module]
Modules:
  - 11

Example:
  sci 11 # to go to module 11
`;

export const home = () => {
  if (window.location.pathname !== '/') {
    Router.push('/')
    return 'Going home...';
  } else {
    return 'cancel';
  }
}

export const goto = (_args: string[]) => {

  switch (_args[0]) {
    case '11':
      if (!window.location.href.includes('/sci/11')) {
        Router.push('/sci/11');
        return 'Going to Sci 11';
      } else {
        return 'cancel';
      }
    default:
      if (window.location.pathname !== _args[0]) {
        Router.push(_args[0]);
        return `Going to ${_args[0]}`;
      } else {
      return help;
      }
  }
};