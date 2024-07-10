# what is this?

this is the hoff zone.

it's my class website.

## why did you make it?

all school websites are bad.

this one is bad, too, but lets me try wild ideas.


like, what if i don't have to tell my students what to do?

what if they can just tell the website what they want to do and it can figure out how to make it line up with the standards?

## can i use it for my class?
sure, dude

download the code, start an openai project, define environment variables for `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_ORGANIZATION`, `OPENAI_PROJECT`, and `URL` (the base url you're hosting it on... maybe localhost:3000?)


all my project instructions are in `/app/sci/[project]`

the website will render any markdown files you save in `/app/**/*.mdx`


if you want to let students replace any part of your instructions, just put `^editable` at the end of the header for the section

(though, this only works for h2 and always tells GPT to write instructions for a whole project... for now)
