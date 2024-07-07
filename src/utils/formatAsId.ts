const formatAsId = (text:string, removeShowGenerate?:boolean) => {
  let _text = text;
  if (removeShowGenerate) {
    _text = _text.replace('^regenerate', '')
  }
  return _text.replaceAll(/[ :[\]~<>+]+/g, '-').replaceAll(/[.|?!@#$%^&*()_=`'";]+/g, '').toLowerCase()
}

export default formatAsId