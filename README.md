# Building Bruges — Website

The website for [Building Bruges](https://buildingbruges.be/), a developer community in and around Bruges.

Built with [Hugo](https://gohugo.io/) using a custom theme (`buildingbruges`).

## Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended edition recommended)

## Running locally

```bash
hugo server
```

The site will be available at `http://localhost:1313`.

## Building

```bash
hugo
```

Output is written to the `public/` directory.

## Content structure

```
content/
├── about.md
├── call-for-papers.md
├── code-of-conduct.md
├── stay-informed.md
└── posts/
    └── YYYY-MM/
        └── post-slug/
            └── index.md
```

Posts are organised by the month they are *published* (i.e. when the announcement goes out), not the month of the event itself.

## Creating an event announcement

Use the `events` archetype so the post gets the correct front matter structure:

```bash
hugo new --kind events posts/YYYY-MM/post-slug/index.md
```

**Example:**

```bash
hugo new --kind events posts/2026-03/my-talk/index.md
```

This creates a file with the following front matter template:

```toml
+++
title = ""
date = ""       # publication date of this post
author = ""
draft = true

[event]
  date = ""     # date and time of the actual event, e.g. "2026-03-25T20:00:00+01:00"
  speaker = ""
  meetup_url = ""
+++
```

### Front matter fields

| Field | Description |
|---|---|
| `title` | The talk title (shown as the post and page heading) |
| `date` | Publication date of the announcement post |
| `author` | Author of the post |
| `draft` | Set to `false` when ready to publish |
| `event.date` | Date and time of the meetup event (ISO 8601 with timezone) |
| `event.speaker` | Full name of the speaker |
| `event.meetup_url` | URL of the Meetup.com RSVP page |

The `event.date` is used by the theme to display the event date in post listings. The `event.meetup_url` is used by the `{{< event-rsvp >}}` shortcode to render the RSVP link.

### Shortcodes

- `{{< event-rsvp >}}` — renders an RSVP link pointing to `event.meetup_url`. Add this at the end of the post.
- `{{< photo-carousel >}}` — renders a photo carousel (used in post-event recap posts).

## Pages

Static pages (`about`, `call-for-papers`, `code-of-conduct`, `stay-informed`) live directly under `content/` and are linked from the main navigation.
