# Editing website content

> [!IMPORTANT]
> Please operate in the `data/` directory.

All the text on the website that changes regularly lives in this folder as
`.json` files. You can edit these directly — no coding needed. After saving a
change, the website needs to be rebuilt/redeployed for it to appear.

## Rules to follow

- Keep the **quote marks** around text: `"like this"`.
- Keep the **commas** between items, but never put a comma after the _last_
  item in a list.
- Don't rename the labels on the left of the colon (`"title"`, `"date"`, …).
  Only change the text on the right.
- If you need a literal `"` inside text, write it as `\"`.

If the site fails to build after an edit, it's almost always a missing comma
or a missing quote mark.

## Which file controls what

| File               | Controls                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `general.json`     | The tagline under the title on the front page, the sentence under the "Enrol" heading, and the logo image. |
| `noticeboard.json` | The principal's photo and quote, plus every notice in the noticeboard carousel.                            |
| `classes.json`     | The "Our Classes" section, and all class times in the Class Arrangement timeline.                          |
| `holiday.json`     | The "Holiday Program" section.                                                                             |
| `results.json`     | All student results (state ranks, ATAR, and each subject).                                                 |
| `contact.json`     | Address, phone numbers, WeChat IDs, email, and the map link in the footer.                                 |

`types.ts` is not a content file — leave it alone.

## Common tasks

### Add or remove a noticeboard notice

In `noticeboard.json`, each notice is one block inside `"notices"`. Copy an
existing block and change the text, or delete a block to remove that notice.

```json
{
  "title": "Group Lessons",
  "date": "Saturday, 24 January 2026",
  "body": "Lessons for Term 2 begin 12/05/2026."
}
```

Remember: commas between blocks, none after the last one. If you delete every
notice, the whole noticeboard section disappears from the page.

### Change or add a class time

In `classes.json`, under `"groups"`. Each group is one year level with its own
list of times in `"schedule"`. Add a line to `"schedule"` to add a class time:

```json
{
  "title": "Years 6–8",
  "lessonDuration": "1.5-hour lesson / week",
  "schedule": ["Year 7 | Wednesday 4pm", "Year 7 | Saturday 9am"]
}
```

You can also add a whole new year group by copying an entire group block, or
remove one by deleting its block.

To update the term shown at the top of that section, edit `"termLabel"` and
`"termDates"`.

### Add a student result

In `results.json`. Each result is one line with the student's name and their
result. Add a line to the relevant list:

```json
"atar": [
  { "name": "Jane S", "result": "99.85" },
  { "name": "John D", "result": "99.20" }
]
```

The lists are `"stateRanks"`, `"atar"`, `"extension2"` (4U), `"extension1"`
(3U) and `"advanced2"` (2U). Emptying a list (`[]`) hides that heading from
the page.

Change `"subheading"` to update the year line, e.g. `"HSC results of our
students for 2026"`.

### Change contact details

In `contact.json`. `"address"`, `"mobile"` and `"wechat"` are lists — each
entry appears on its own line on the website. `"email"` is a single line.
`"mapUrl"` is the Google Maps link used by the photo in the footer.

### Change a photo

Put the new image file in the `public/images/` folder, then point the relevant
field at it — for example in `noticeboard.json`:

```json
"principalPhoto": "/images/NewPrincipalPhoto.jpg"
```

The path always starts with a `/` and leaves out the word `public`.

`classes.json` and `holiday.json` also have a `"photoAlt"` next to the photo.
This is a short description of what the picture shows. It is never displayed,
but it is read aloud to visitors using a screen reader and it is what Google
uses to understand the image, so change it whenever you change the photo:

```json
"photo": "/images/ClassPhoto.jpg",
"photoAlt": "Students working through problems in a Year 11 class"
```

Both currently say `PLACEHOLDER` because the photos are still stand-ins.

### Change contact details for search engines

`contact.json` has a `"postal"` block underneath the address:

```json
"postal": {
  "street": "Suite 205, Level 2, 3 Carlingford Road",
  "locality": "Epping",
  "region": "NSW",
  "postcode": "2121",
  "country": "AU"
}
```

This is the same address again, split into parts. Nobody sees it — it is what
tells Google the school is a real business at a real address, which is how the
site turns up in searches like "maths tutor Epping". If you change the address
above, change it here too.

## Every section has its own web address

The site is one long page, but each section can also be linked to directly:

| Address        | Opens at            |
| -------------- | ------------------- |
| `/`            | The top of the page |
| `/noticeboard` | Noticeboard         |
| `/classes`     | Class Arrangement   |
| `/holiday`     | Holiday Program     |
| `/results`     | Student Results     |
| `/enrol`       | Enrol               |
| `/contact`     | Contact details     |

Send a parent `.../classes` and they land on the timetable. The address bar
also updates by itself as you scroll, so you can always copy whatever is on
screen and send it to someone.

## Settings for whoever deploys the site

These are set once, in the hosting service (Vercel, Netlify, and so on) — not
in the `data/` files.

| Setting                       | What it does                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | The site's real web address, e.g. `https://targetcoaching.com.au`. Needed for Google and for link previews. |
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT`| Where the enrolment and enquiry forms send their answers.                                  |

**Both should be set before the site goes live.** Without
`NEXT_PUBLIC_ENQUIRY_ENDPOINT` the forms fall back to opening the visitor's
email app, which silently does nothing on many phones — so enquiries can be
lost without anyone knowing. Any service that accepts a form post will do
(Formspree, Web3Forms, Basin).
