// import { redirect } from 'next/navigation';

const gotoHelp = `Usage: goto [path]
Example:
  goto sci 11 to go to /sci/11`

const sciHelp = `Usage: sci [module]

Example:
  sci 11 # to go to module 11
`;

export const home = (_args: string[], { router }) => {
  if (window.location.pathname !== '/') {
    router.push('/')
    return 'Going home...';
  } else {
    return 'cancel';
  }
}

export const goto = (_args: string[], {router}) => {
  if (_args.length === 0) return gotoHelp;

  let pathname = _args.join('/');
  if (!pathname.startsWith('/')) pathname = '/' + pathname;
  
  if (window.location.pathname !== pathname) {
    router.push(pathname);
    return `Going to ${pathname}`;
  } else {
    return 'cancel';
  }
}

export const sci = (_args: string[], {router}) => {
  const moduleNum = _args[0]
  if (!['11', '12', '13', '20'].includes(moduleNum)) {
    return sciHelp
  }

  if (!window.location.href.includes(`/sci/${moduleNum}`)) {
    router.push(`/sci/${moduleNum}`);
    return `Going to Sci ${moduleNum}`
  }
};