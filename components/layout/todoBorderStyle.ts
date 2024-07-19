const todoBorderStyle = ".checklist-item:not(.checklist-item > span > .checklist-item) {\
  border: 1px solid var(--cursorColor);\
  border-radius: 8px;\
  padding: 1em;\
  margin: 1.5em 0;\
  position: relative;\
  z-index: 1;\
}\
.checklist-item > span > ul {\
  margin-bottom: 0;\
}\
.checklist-item > span > .checklist-item {\
  margin-bottom: 0 !important;\
}\
\
.checklist-item.is-checked:after {\
  content: '';\
  background: var(--cursorColor);\
  opacity: 0.33;\
  position: absolute;\
  top: 0;\
  bottom: 0;\
  left: 0;\
  right: 0;\
  z-index: -1;\
}\
"

export default todoBorderStyle