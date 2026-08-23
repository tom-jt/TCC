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
