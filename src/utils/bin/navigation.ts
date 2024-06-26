import Router from "next/router";
// import { redirect } from 'next/navigation';

const gotoHelp = `Usage: goto [path]
Example:
  goto sci 11 to go to /sci/11`

const sciHelp = `Usage: sci [module]
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
  if (_args.length === 0) return gotoHelp;

  let pathname = _args.join('/');
  if (!pathname.startsWith('/')) pathname = '/' + pathname;
  
  if (window.location.pathname !== pathname) {
    Router.push(pathname);
    return `Going to ${pathname}`;
  } else {
    return 'cancel';
  }
}

export const sci = (_args: string[]) => {

  switch (_args[0]) {
    case '11':
      if (!window.location.href.includes('/sci/11')) {
        Router.push('/sci/11');
        return 'Going to Sci 11';
      } else {
        return 'cancel';
      }
    case '20':
      if (!window.location.href.includes('/sci/20')) {
        Router.push('/sci/20');
        return 'Going to Sci 20';
      } else {
        return 'cancel';
      }
    default:
      return sciHelp;
  }
};