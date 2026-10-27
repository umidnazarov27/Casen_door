"""Create three English client-facing concept PDFs from verified local designs.

Run with the bundled Python runtime; ReportLab and Pillow are required.
Clean desktop/mobile captures live under tmp/pdfs/design-presentations/.
"""
from pathlib import Path
from html import escape
from io import BytesIO
import json

from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
TEMP = ROOT / 'tmp/pdfs/design-presentations'
OUT = ROOT / 'output/pdf/design-presentations'
W, H = 1280, 800

for name, file in [
    ('Sans', 'Arial.ttf'), ('SansBold', 'Arial Bold.ttf'),
    ('Serif', 'Georgia.ttf'), ('SerifItalic', 'Georgia Italic.ttf'),
]:
    pdfmetrics.registerFont(TTFont(name, f'/System/Library/Fonts/Supplemental/{file}'))

CONCEPTS = [
    dict(id='signature', number='01', name='Signature',
         tagline='Familiar by design.',
         summary='A clean, confident extension of the Casen Doors website. A generous kitchen photograph sits beside a clear, guided selection panel.',
         bg='#FFFFFF', ink='#191919', muted='#77756F', line='#DEDED9', accent='#191919', panel='#F4F4F0', title_font='Sans',
         palette=[('#FFFFFF', 'White'), ('#191919', 'Black'), ('#E9E7DF', 'Warm grey')],
         attributes=['White and black', 'Clear product-page layout', 'Closest to the current website'],
         desktop_title='A familiar way to configure.',
         desktop_desc='The photograph and the configuration controls share one view, with a simple left-to-right reading order.',
         decisions=[
             ('COMPOSITION', 'A large image on the left. Four configuration stages on the right. The estimated total sits close to the next action.'),
             ('TYPOGRAPHY', 'Assistant sans-serif headings and straightforward labels echo the existing Casen Doors storefront.'),
             ('VISUAL CHARACTER', 'White space, fine dividers and black buttons create a restrained, recognisable shopping experience.'),
         ],
         mobile_title='The same clarity, on mobile.',
         mobile_desc='The photograph moves above the controls. The same four stages remain easy to follow on a narrower screen.',
         why='Choose Signature if the priority is a natural continuation of the current website, with clear navigation and a familiar product-page structure.',
         focus='Confirm the split-page composition, white-and-black palette and understated typography.'),
    dict(id='architectural', number='02', name='Architectural',
         tagline='Space for the everyday.',
         summary='A warmer, editorial direction. A panoramic kitchen image leads the experience, with the configuration choices arranged horizontally below.',
         bg='#F3F0E9', ink='#34352F', muted='#7C7B6E', line='#D7D1C5', accent='#4C5146', panel='#E8E5DB', title_font='Serif',
         palette=[('#F3F0E9', 'Warm stone'), ('#4C5146', 'Olive grey'), ('#34352F', 'Charcoal')],
         attributes=['Panoramic photography', 'Warm, material-led palette', 'Horizontal configuration panel'],
         desktop_title='Let the space lead.',
         desktop_desc='A wide kitchen photograph creates context first. A horizontal configuration panel then brings the choices into focus.',
         decisions=[
             ('COMPOSITION', 'A panoramic image above a full-width selector. Layout cards sit in one row on desktop, with the estimated total below.'),
             ('TYPOGRAPHY', 'Serif headlines add an editorial quality, balanced by clean sans-serif controls and compact labels.'),
             ('VISUAL CHARACTER', 'Stone, olive grey and charcoal connect the interface to the natural finishes shown in the photography.'),
         ],
         mobile_title='An editorial layout, adapted.',
         mobile_desc='The image remains the introduction. The horizontal desktop choices become a two-column mobile grid.',
         why='Choose Architectural if the kitchen imagery should lead the story, with a warmer, more editorial presentation of the Casen Doors collection.',
         focus='Confirm the panoramic image treatment, serif headlines and warmer colour direction.'),
    dict(id='studio', number='03', name='Studio',
         tagline='Designed around you.',
         summary='An immersive, high-contrast direction. A dark canvas frames the kitchen imagery, while compact controls and warm accents guide the choices.',
         bg='#202522', ink='#F2F0E8', muted='#A5AAA1', line='#434A41', accent='#D4BD96', panel='#282E29', title_font='Serif',
         palette=[('#202522', 'Graphite'), ('#D4BD96', 'Warm sand'), ('#F2F0E8', 'Soft white')],
         attributes=['Immersive dark canvas', 'Large image and compact controls', 'Warm, contrasting accents'],
         desktop_title='An immersive design studio.',
         desktop_desc='The kitchen image takes more space. A compact panel and numbered vertical rail frame the configuration journey.',
         decisions=[
             ('COMPOSITION', 'An expansive image on the left and a compact panel on the right. A vertical rail marks the four stages on desktop.'),
             ('TYPOGRAPHY', 'Expressive serif headlines introduce the collection. Sans-serif controls keep the interactive panel clear.'),
             ('VISUAL CHARACTER', 'Graphite surfaces and warm sand accents emphasise the photograph, selected options and primary action.'),
         ],
         mobile_title='A compact studio in your hand.',
         mobile_desc='The dark palette carries through to mobile. The vertical desktop rail becomes a horizontal step navigation.',
         why='Choose Studio if the aim is a more immersive, distinct presentation, with the kitchen imagery framed by a darker visual environment.',
         focus='Confirm the dark palette, warm accent and more compact configuration panel.'),
]


def colour(value):
    return HexColor(value)


def rect(c, x, y, w, h, fill, stroke=None, radius=0):
    c.setFillColor(colour(fill))
    c.setStrokeColor(colour(stroke or fill))
    c.setLineWidth(.7)
    if radius:
        c.roundRect(x, y, w, h, radius, fill=1, stroke=int(stroke is not None))
    else:
        c.rect(x, y, w, h, fill=1, stroke=int(stroke is not None))


def text(c, value, x, y, size=12, fill='#191919', font='Sans', tracking=0):
    c.saveState()
    c.setFillColor(colour(fill))
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setCharSpace(tracking)
    t.textOut(value)
    c.drawText(t)
    c.restoreState()


def para(c, value, x, top, width, size, fill, font='Sans', leading=None, limit=None):
    style = ParagraphStyle('body', fontName=font, fontSize=size,
                           leading=leading or size * 1.5, textColor=colour(fill))
    p = Paragraph(escape(value).replace('\n', '<br/>'), style)
    _, height = p.wrap(width, H)
    if limit is not None:
        assert height <= limit, (value, height, limit)
    assert top - height >= 35, (value, top, height)
    p.drawOn(c, x, top-height)
    return top-height


def photo(c, path, x, y, width, height, fit='cover'):
    with Image.open(path) as im:
        iw, ih = im.size
        # Embed high-quality JPEGs rather than raw PNG pixels in client PDFs.
        stream = BytesIO()
        im.convert('RGB').save(stream, format='JPEG', quality=94, subsampling=0)
        stream.seek(0)
    scale = max(width/iw, height/ih) if fit == 'cover' else min(width/iw, height/ih)
    dw, dh = iw*scale, ih*scale
    c.saveState()
    p = c.beginPath()
    p.rect(x, y, width, height)
    c.clipPath(p, stroke=0)
    c.drawImage(ImageReader(stream), x+(width-dw)/2, y+(height-dh)/2,
                dw, dh, mask='auto')
    c.restoreState()
    return dw, dh


def logo(c, d, x=48, y=714, width=105):
    path = TEMP / ('logo-light.png' if d['id'] == 'studio' else 'logo.png')
    with Image.open(path) as im:
        height = width * im.height/im.width
    c.drawImage(str(path), x, y, width, height, mask='auto')


def page_base(c, d, number, label):
    rect(c, 0, 0, W, H, d['bg'])
    logo(c, d)
    text(c, 'KITCHEN CONFIGURATOR / DESIGN DIRECTION ' + d['number'], 208, 740,
         9, d['muted'], tracking=1.2)
    text(c, label, 208, 722, 10, d['muted'])
    c.setStrokeColor(colour(d['line']))
    c.setLineWidth(.6)
    c.line(48, 695, W-48, 695)
    c.line(48, 48, W-48, 48)
    text(c, f'CASEN DOORS  /  {d["name"].upper()}', 48, 28, 8, d['muted'], tracking=1)
    text(c, 'CONCEPT PRESENTATION - FOR DISCUSSION', 484, 28, 8, d['muted'], tracking=.6)
    text(c, f'{number:02} / 03', W-94, 28, 8, d['muted'])


def cover(c, d):
    page_base(c, d, 1, 'Concept overview')
    text(c, f'0{int(d["number"])}  /  VISUAL DIRECTION', 48, 646, 9, d['muted'], tracking=1.5)
    text(c, d['name'], 48, 576, 49, d['ink'], d['title_font'])
    end = para(c, d['tagline'], 48, 541, 425, 25, d['accent'],
               'SerifItalic' if d['id'] != 'signature' else 'Sans', limit=70)
    end = para(c, d['summary'], 48, end-30, 395, 14, d['muted'], leading=22, limit=135)
    c.setStrokeColor(colour(d['line']))
    c.line(48, end-25, 443, end-25)
    top = end-49
    for i, attr in enumerate(d['attributes'], 1):
        text(c, f'0{i}', 48, top-2, 9, d['muted'])
        para(c, attr, 78, top+10, 355, 12, d['ink'], limit=38)
        top -= 38
    photo(c, ROOT/'fixtures/images/kitchen-reference.png', 505, 135, 727, 520)
    para(c, 'Reference kitchen photography. Shown for visual direction, not as an exact selected configuration.',
         505, 117, 700, 9, d['muted'], leading=13, limit=29)
    text(c, 'COLOUR DIRECTION', 48, 174, 8, d['muted'], tracking=1.4)
    for i, (hex_value, name) in enumerate(d['palette']):
        x = 48+i*132
        rect(c, x, 129, 112, 27, hex_value, d['line'])
        text(c, name, x, 112, 9, d['muted'])
    c.showPage()


def desktop(c, d):
    page_base(c, d, 2, 'Desktop interface and design decisions')
    text(c, d['desktop_title'], 48, 650, 31, d['ink'], d['title_font'])
    para(c, d['desktop_desc'], 48, 626, 1120, 12, d['muted'], leading=18, limit=40)
    rect(c, 48, 119, 891, 465, '#FFFFFF', d['line'])
    photo(c, TEMP/f'{d["id"]}-desktop.png', 56, 127, 875, 449, fit='contain')
    top = 580
    for label, body in d['decisions']:
        text(c, label, 974, top, 8, d['accent'], tracking=1.3)
        bottom = para(c, body, 974, top-15, 255, 12, d['ink'], leading=18, limit=126)
        top = bottom-31
    para(c, 'Desktop concept. Prices, dimensions and VAT shown in the interface are illustrative.',
         48, 99, 891, 9, d['muted'], leading=13, limit=29)
    c.showPage()


def mobile(c, d):
    page_base(c, d, 3, 'Mobile interface and client review')
    text(c, d['mobile_title'], 48, 650, 31, d['ink'], d['title_font'])
    para(c, d['mobile_desc'], 48, 625, 780, 12, d['muted'], leading=18, limit=42)
    photo(c, ROOT/'fixtures/images/storage-reference.png', 48, 330, 419, 237)
    text(c, 'REFERENCE DETAIL PHOTOGRAPHY', 48, 312, 8, d['muted'], tracking=1)
    x, top = 501, 560
    text(c, 'A CONSISTENT JOURNEY', x, top, 9, d['accent'], tracking=1.2)
    items = [
        ('01', 'Choose a layout', 'A clear starting point with preset dimensions.'),
        ('02', 'Consider an island', 'Add an island or keep the centre open.'),
        ('03', 'Select your storage', 'Choose useful additions for everyday routines.'),
        ('04', 'Finish and review', 'Choose the carcass finish and view a quotation.'),
    ]
    for number, title, body in items:
        top -= 39
        text(c, number, x, top, 9, d['muted'])
        text(c, title, x+30, top, 13, d['ink'])
        para(c, body, x+30, top-10, 300, 10, d['muted'], leading=14, limit=31)
        top -= 20
    text(c, 'Why choose this direction?', 48, 256, 23, d['ink'], d['title_font'])
    para(c, d['why'], 48, 235, 778, 13, d['ink'], leading=20, limit=65)
    text(c, 'CLIENT REVIEW FOCUS', 48, 143, 8, d['accent'], tracking=1.4)
    para(c, d['focus'], 48, 128, 778, 11, d['muted'], leading=16, limit=36)
    rect(c, 904, 91, 328, 563, '#0F1310', radius=19)
    rect(c, 913, 101, 310, 543, d['bg'], radius=12)
    photo(c, TEMP/f'{d["id"]}-mobile.png', 921, 111, 294, 523, fit='contain')
    para(c, 'MOBILE CONFIGURATION', 939, 79, 290, 8, d['muted'], leading=11, limit=14)
    c.showPage()


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    for d in CONCEPTS:
        # Browser element screenshots can use stale scroll offsets. Crop each
        # region from a full-page capture using its measured page coordinates.
        for view in ['desktop', 'mobile']:
            bounds = json.loads((TEMP/f'{d["id"]}-{view}-rect.json').read_text())['data']['result']
            with Image.open(TEMP/f'{d["id"]}-{view}-full.png') as im:
                box = tuple(round(v) for v in [bounds['x'], bounds['y'], bounds['x']+bounds['width'], bounds['y']+bounds['height']])
                assert 0 <= box[0] < box[2] <= im.width and 0 <= box[1] < box[3] <= im.height, (box, im.size)
                im.crop(box).save(TEMP/f'{d["id"]}-{view}.png')
        path = OUT/f'Casen_Doors_{d["number"]}_{d["name"]}.pdf'
        c = canvas.Canvas(str(path), pagesize=(W, H), pageCompression=1)
        c.setTitle(f'Casen Doors | {d["number"]} {d["name"]} | Kitchen Configurator')
        c.setAuthor('Casen Doors - Design Presentation')
        c.setSubject(f'English client presentation of the {d["name"]} design direction')
        cover(c, d)
        desktop(c, d)
        mobile(c, d)
        c.save()
        print(path.relative_to(ROOT))


if __name__ == '__main__':
    build()
