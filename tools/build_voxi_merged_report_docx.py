from __future__ import annotations

import datetime as dt
import io
import mimetypes
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image


OUT = Path("Voxi_Merged_A4_Report_FINAL.docx")
DOWNLOADS = Path(r"C:\Users\hp\Downloads")

IMAGES = {
    "overall_flow": DOWNLOADS / "Voxi User Interaction Flow-2026-05-28-100052.png",
    "offline_flow": DOWNLOADS / "Voxi User Interaction Flow-2026-05-28-100805.png",
    "icons_flow": DOWNLOADS / "Voxi User Interaction Flow-2026-05-28-101036.png",
    "emergency_flow": DOWNLOADS / "Voxi User Interaction Flow-2026-05-28-101130.png",
    "training_flow": DOWNLOADS / "Voxi User Interaction Flow-2026-05-28-101320.png",
    "drawing_chat_flow": DOWNLOADS / "Voxi User Interaction Flow-2026-05-28-101416.png",
    "daily_routine_flow": DOWNLOADS / "Voxi User Interaction Flow-2026-05-28-101513.png",
    "architecture_flow": DOWNLOADS / "Voxi User Interaction Flow-2026-05-28-101551.png",
    "relational_erd": DOWNLOADS / "Voxi User Interaction Flow-2026-05-28-104353.png",
    "conceptual_erd": DOWNLOADS / "Screenshot 2026-05-13 113953.png",
    "gantt": DOWNLOADS / "smart_assistive_app_gantt_chart.png",
}


EMU_PER_INCH = 914400
PAGE_W = 11906
PAGE_H = 16838
MARGIN = 850


def xml_text(text: str) -> str:
    return escape(text, {'"': "&quot;"})


def run(text: str, *, bold: bool = False, italic: bool = False, size: int | None = None, color: str | None = None) -> str:
    props = []
    if bold:
        props.append("<w:b/>")
    if italic:
        props.append("<w:i/>")
    if size:
        props.append(f'<w:sz w:val="{size}"/>')
        props.append(f'<w:szCs w:val="{size}"/>')
    if color:
        props.append(f'<w:color w:val="{color}"/>')
    rpr = f"<w:rPr>{''.join(props)}</w:rPr>" if props else ""
    space = ' xml:space="preserve"' if text.startswith(" ") or text.endswith(" ") else ""
    return f"<w:r>{rpr}<w:t{space}>{xml_text(text)}</w:t></w:r>"


def para(
    text: str = "",
    *,
    style: str | None = None,
    align: str | None = None,
    bold: bool = False,
    italic: bool = False,
    size: int | None = None,
    color: str | None = None,
    before: int = 0,
    after: int = 110,
) -> str:
    ppr = []
    if style:
        ppr.append(f'<w:pStyle w:val="{style}"/>')
    if align:
        ppr.append(f'<w:jc w:val="{align}"/>')
    ppr.append(f'<w:spacing w:before="{before}" w:after="{after}" w:line="276" w:lineRule="auto"/>')
    return f"<w:p><w:pPr>{''.join(ppr)}</w:pPr>{run(text, bold=bold, italic=italic, size=size, color=color)}</w:p>"


def bullet(text: str, level: int = 0) -> str:
    prefix = "  " * level + "- "
    return para(prefix + text, after=70)


def heading(text: str, level: int = 1) -> str:
    return para(text, style=f"Heading{level}", after=130)


def page_break() -> str:
    return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>'


def tbl(rows: list[list[str]], widths: list[int] | None = None) -> str:
    if not rows:
        return ""
    widths = widths or [int(9000 / len(rows[0]))] * len(rows[0])
    out = [
        "<w:tbl>",
        "<w:tblPr><w:tblStyle w:val=\"TableGrid\"/><w:tblW w:w=\"0\" w:type=\"auto\"/>"
        "<w:tblLook w:firstRow=\"1\" w:noHBand=\"0\" w:noVBand=\"1\"/></w:tblPr>",
    ]
    for ridx, row in enumerate(rows):
        out.append("<w:tr>")
        for cidx, cell in enumerate(row):
            shade = '<w:shd w:fill="D9EAF7"/>' if ridx == 0 else ""
            out.append(f'<w:tc><w:tcPr><w:tcW w:w="{widths[min(cidx, len(widths)-1)]}" w:type="dxa"/>{shade}</w:tcPr>')
            out.append(para(cell, bold=(ridx == 0), size=18 if len(cell) > 80 else 20, after=50))
            out.append("</w:tc>")
        out.append("</w:tr>")
    out.append("</w:tbl>")
    return "".join(out)


class DocxBuilder:
    def __init__(self) -> None:
        self.relationships: list[tuple[str, str, str]] = []
        self.media: list[tuple[str, bytes]] = []
        self.image_counter = 0

    def add_image(self, path: Path, *, max_w_in: float = 6.85, max_h_in: float = 8.55) -> str:
        if not path.exists():
            return para(f"[Missing image: {path}]", italic=True, color="A00000")

        with Image.open(path) as im:
            im = im.convert("RGB")
            width_px, height_px = im.size
            max_px = 3200
            scale_px = min(1.0, max_px / max(width_px, height_px))
            if scale_px < 1.0:
                im = im.resize((int(width_px * scale_px), int(height_px * scale_px)), Image.Resampling.LANCZOS)
                width_px, height_px = im.size

            ratio = min(max_w_in / width_px, max_h_in / height_px)
            display_w = width_px * ratio
            display_h = height_px * ratio
            cx = int(display_w * EMU_PER_INCH)
            cy = int(display_h * EMU_PER_INCH)
            bio = io.BytesIO()
            im.save(bio, format="PNG", optimize=True)

        self.image_counter += 1
        media_name = f"image{self.image_counter}.png"
        rid = f"rId{self.image_counter}"
        self.media.append((media_name, bio.getvalue()))
        self.relationships.append((rid, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", f"media/{media_name}"))
        name = xml_text(path.name)
        docpr_id = self.image_counter
        return f"""
        <w:p>
          <w:pPr><w:jc w:val="center"/><w:spacing w:after="80"/></w:pPr>
          <w:r>
            <w:drawing>
              <wp:inline distT="0" distB="0" distL="0" distR="0">
                <wp:extent cx="{cx}" cy="{cy}"/>
                <wp:docPr id="{docpr_id}" name="Picture {docpr_id}"/>
                <wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>
                <a:graphic>
                  <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                    <pic:pic>
                      <pic:nvPicPr><pic:cNvPr id="0" name="{name}"/><pic:cNvPicPr/></pic:nvPicPr>
                      <pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>
                      <pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>
                    </pic:pic>
                  </a:graphicData>
                </a:graphic>
              </wp:inline>
            </w:drawing>
          </w:r>
        </w:p>
        """

    def image_page(
        self,
        title: str,
        image_key: str,
        caption: str,
        note: str = "",
        **image_options: float,
    ) -> dict:
        return {
            "title": title,
            "paragraphs": [note] if note else [],
            "image": image_key,
            "caption": caption,
            **image_options,
        }

    def build_page(self, p: dict) -> str:
        parts: list[str] = []
        title = p.get("title")
        if title:
            parts.append(heading(title, p.get("level", 1)))
        for text in p.get("paragraphs", []):
            parts.append(para(text))
        for text in p.get("bullets", []):
            parts.append(bullet(text))
        for table in p.get("tables", []):
            parts.append(tbl(table["rows"], table.get("widths")))
            parts.append(para("", after=80))
        if p.get("image"):
            parts.append(self.add_image(IMAGES[p["image"]], max_w_in=p.get("max_w", 6.85), max_h_in=p.get("max_h", 8.55)))
            if p.get("caption"):
                parts.append(para(p["caption"], style="Caption", align="center", italic=True, size=18, color="444444"))
        for text in p.get("closing", []):
            parts.append(para(text))
        return "".join(parts)

    def document_xml(self, pages: list[dict]) -> str:
        body_parts = []
        for idx, p in enumerate(pages):
            body_parts.append(self.build_page(p))
            if idx != len(pages) - 1:
                body_parts.append(page_break())
        body_parts.append(
            f'<w:sectPr><w:pgSz w:w="{PAGE_W}" w:h="{PAGE_H}"/>'
            f'<w:pgMar w:top="{MARGIN}" w:right="{MARGIN}" w:bottom="{MARGIN}" w:left="{MARGIN}" w:header="450" w:footer="450" w:gutter="0"/>'
            '<w:cols w:space="708"/><w:docGrid w:linePitch="360"/></w:sectPr>'
        )
        return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
 xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
 xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
 xmlns:v="urn:schemas-microsoft-com:vml"
 xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
 xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
 xmlns:w10="urn:schemas-microsoft-com:office:word"
 xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
 xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
 xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
 xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk"
 xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"
 xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
 xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
 xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"
 mc:Ignorable="w14 wp14"><w:body>{''.join(body_parts)}</w:body></w:document>'''

    def write(self, pages: list[dict]) -> None:
        doc_xml = self.document_xml(pages)
        rels = [
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
        ]
        for rid, typ, target in self.relationships:
            rels.append(f'<Relationship Id="{rid}" Type="{typ}" Target="{target}"/>')
        rels.append("</Relationships>")

        with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.writestr("[Content_Types].xml", content_types_xml())
            zf.writestr("_rels/.rels", package_rels_xml())
            zf.writestr("docProps/core.xml", core_xml())
            zf.writestr("docProps/app.xml", app_xml())
            zf.writestr("word/document.xml", doc_xml)
            zf.writestr("word/styles.xml", styles_xml())
            zf.writestr("word/settings.xml", settings_xml())
            zf.writestr("word/_rels/document.xml.rels", "".join(rels))
            for media_name, data in self.media:
                zf.writestr(f"word/media/{media_name}", data)


def content_types_xml() -> str:
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>'''


def package_rels_xml() -> str:
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>'''


def core_xml() -> str:
    now = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
 xmlns:dc="http://purl.org/dc/elements/1.1/"
 xmlns:dcterms="http://purl.org/dc/terms/"
 xmlns:dcmitype="http://purl.org/dc/dcmitype/"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
 <dc:title>VOXI Merged A4 Report</dc:title>
 <dc:subject>AAC application report with updated diagrams and statistics</dc:subject>
 <dc:creator>Codex</dc:creator>
 <cp:keywords>VOXI,AAC,Autism,Cerebral Palsy,Intellectual Disability,Dementia</cp:keywords>
 <dcterms:created xsi:type="dcterms:W3CDTF">{now}</dcterms:created>
 <dcterms:modified xsi:type="dcterms:W3CDTF">{now}</dcterms:modified>
</cp:coreProperties>'''


def app_xml() -> str:
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
 xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
 <Application>Codex OpenXML Writer</Application>
 <DocSecurity>0</DocSecurity>
 <ScaleCrop>false</ScaleCrop>
 <Company>Cairo University Graduation Project</Company>
</Properties>'''


def settings_xml() -> str:
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:zoom w:percent="100"/>
  <w:defaultTabStop w:val="720"/>
</w:settings>'''


def styles_xml() -> str:
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
    <w:pPr><w:spacing w:after="100" w:line="276" w:lineRule="auto"/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:qFormat/>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:b/><w:sz w:val="34"/><w:szCs w:val="34"/><w:color w:val="1F4E79"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Subtitle">
    <w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:qFormat/>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="24"/><w:szCs w:val="24"/><w:color w:val="555555"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/>
    <w:pPr><w:spacing w:before="0" w:after="160"/><w:keepNext/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:b/><w:sz w:val="27"/><w:szCs w:val="27"/><w:color w:val="1F4E79"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/>
    <w:pPr><w:spacing w:before="80" w:after="120"/><w:keepNext/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:b/><w:sz w:val="23"/><w:szCs w:val="23"/><w:color w:val="2F5597"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Caption">
    <w:name w:val="Caption"/><w:basedOn w:val="Normal"/><w:qFormat/>
    <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:i/><w:sz w:val="18"/><w:szCs w:val="18"/><w:color w:val="666666"/></w:rPr>
  </w:style>
  <w:style w:type="table" w:styleId="TableGrid">
    <w:name w:val="Table Grid"/><w:basedOn w:val="TableNormal"/><w:uiPriority w:val="39"/><w:qFormat/>
    <w:tblPr><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="A6A6A6"/><w:left w:val="single" w:sz="4" w:space="0" w:color="A6A6A6"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="A6A6A6"/><w:right w:val="single" w:sz="4" w:space="0" w:color="A6A6A6"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="A6A6A6"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="A6A6A6"/></w:tblBorders></w:tblPr>
  </w:style>
</w:styles>'''


def make_pages(builder: DocxBuilder) -> list[dict]:
    pages: list[dict] = [
        {
            "title": "VOXI: Augmentative and Alternative Communication Application",
            "level": 1,
            "paragraphs": [
                "Merged Graduation Project Report - A4 Word Version",
                "Prepared for Cairo University, Faculty of Engineering, Biomedical Data Engineering.",
                "Prepared by: Mayar Ayman. Advisor: Dr. Ahmed Hisham.",
                "This document merges the previous GP1 project report, the detailed Voxi feature report, and the updated ERD, user-flow, architecture, and Gantt chart images supplied on May 28, 2026.",
                "Report length target: 45 A4 pages. Language: English. File type: DOCX.",
            ],
        },
        {
            "title": "Abstract",
            "paragraphs": [
                "Communication is a basic human need. Many children and adults cannot rely on natural speech because of autism spectrum disorder, cerebral palsy, intellectual disability, speech delay, stroke, traumatic brain injury, aphasia, Alzheimer disease, dementia, or temporary medical conditions such as intubation. VOXI is designed as an augmentative and alternative communication application that gives these users a practical way to express needs, feelings, choices, emergencies, and daily routines.",
                "The application combines symbol-based AAC, multilingual text, text-to-speech, human recordings, emergency messaging, speech practice, drawing-to-text recognition, an AAC assistant, daily-routine tracking, offline support, and caregiver customization. It uses a React frontend, Express backend, PostgreSQL database, Prisma ORM, media upload handling, browser storage, service-worker caching, OCR, and optional AI/TTS providers.",
                "The updated report replaces the older diagrams with the new relational table ERD, complete user-flow diagrams, backend architecture diagram, and February-to-May project Gantt chart. It also adds a stronger background section explaining how people communicated before modern AAC and how digital AAC changes independence, safety, education, and quality of life.",
            ],
        },
        {
            "title": "Table of Contents",
            "paragraphs": [
                "1. Project Overview and Scope ........................................ 4",
                "2. Problem Statement, Target Users, and Statistics ................. 5-8",
                "3. AAC Background: Before and After Modern AAC ..................... 9-11",
                "4. Market Research, SWOT, Objectives, and Requirements ............. 12-15",
                "5. Methodology, Technology Stack, and Architecture .................. 16-21",
                "6. Database Design and ERD .......................................... 22-24",
                "7. VOXI Functional Modules and User Flows .......................... 25-37",
                "8. Project Schedule, UI/UX, Mobile, Security, and Testing .......... 38-43",
                "9. Challenges, Future Work, Conclusion, and References .............. 44-45",
            ],
        },
        {
            "title": "Merged Source Materials and Report Scope",
            "paragraphs": [
                "This final report merges two written sources: GP1.docx, which contained the original graduation project report, and Voxi_App_Detailed_Features_Report_A4_UPDATED.doc, which described the application features in greater implementation detail. The merged version keeps the project identity and business/technical structure from GP1 while expanding the feature explanations from the detailed Voxi report.",
                "The old visuals are replaced with the newly supplied images: the relational table ERD, updated user interaction flows, backend architecture flow, and smart assistive application Gantt chart. The old conceptual ERD is retained only as a supporting conceptual view, while the relational ERD is treated as the implementation-level database schema.",
                "The new report is written in English and organized as an A4 document. Each page focuses on one purpose: background, market, design, architecture, database, a specific VOXI module, testing, or future work. This makes the report suitable for printing and for academic submission.",
            ],
        },
        {
            "title": "Problem Statement",
            "paragraphs": [
                "Many individuals can understand the world around them but cannot reliably express what they need, feel, want, or remember through spoken language. The communication barrier may be lifelong, as in autism, cerebral palsy, or intellectual disability, or acquired later because of stroke, traumatic brain injury, dementia, or Alzheimer disease. In hospitals, even a person with typical speech may temporarily lose the ability to talk because of intubation, surgery, weakness, or severe illness.",
                "Traditional AAC tools can be expensive, platform-specific, difficult to customize, or limited to one language. Low-tech boards and cards are useful but cannot speak aloud, store personal audio, adapt quickly, log usage, or send emergency messages. Many families therefore need a flexible solution that can work across web and mobile devices and remain understandable for children, elderly users, caregivers, therapists, and teachers.",
                "VOXI addresses this gap by combining simple visual communication with modern digital services. The user can tap icons, build sentences, hear speech output, draw a feeling or word, practice pronunciation, save repeated items, and send urgent messages. The design goal is not only to replace speech but also to create a calmer, safer, and more independent communication routine.",
            ],
        },
        {
            "title": "Target Users and Personas",
            "paragraphs": [
                "VOXI is intended for people with complex communication needs and for the support partners who help them communicate. The application is not limited to one diagnosis; it focuses on functional communication. A user may need the app every day, during therapy only, during school activities, or in a temporary medical emergency.",
            ],
            "bullets": [
                "Children with autism, speech delay, Down syndrome, intellectual disability, or hearing-related communication barriers who benefit from visual symbols and predictable routines.",
                "People with cerebral palsy, motor impairment, stroke, aphasia, traumatic brain injury, ALS, or muscular dystrophy who may need speech output because natural speech is unclear or impossible.",
                "Older adults with Alzheimer disease, dementia, memory loss, or aphasia who need familiar images, reminders, family names, emergency phrases, and simplified choices.",
                "Temporary users such as ICU patients, intubated patients, travelers, or migrants who need fast access to basic needs, pain, help, or location-related phrases.",
                "Caregivers, speech-language pathologists, teachers, and family members who need to customize vocabulary, record audio, add emergency numbers, and support daily practice.",
            ],
        },
        {
            "title": "Epidemiology and Need for AAC",
            "paragraphs": [
                "The population that may benefit from AAC is large and diverse. The numbers below are not presented to label people as patients; they show why communication support must be considered a public health and accessibility need. Many people in these groups communicate successfully with speech, while others need AAC some or all of the time.",
            ],
            "tables": [
                {
                    "rows": [
                        ["Condition", "Recent statistic", "Why it matters for VOXI"],
                        ["Autism spectrum disorder", "CDC reported about 1 in 31 eight-year-old children in monitored U.S. communities identified with autism using 2022 data; WHO estimates autism affects about 1 in 127 people globally.", "A meaningful subset of autistic users are minimally speaking, have situational speech loss, or need visual supports to express needs and feelings."],
                        ["Cerebral palsy", "CDC surveillance describes CP as affecting about 1 in 345 children in the United States. Global studies often report roughly 1 to 4 per 1,000 live births depending on region and study method.", "Motor impairment and dysarthria can make speech hard to understand, so visual selection and speech output are essential."],
                        ["Intellectual disability", "U.S. child health surveys estimate intellectual disability among children at roughly 1.6% to 2.2%, and general pediatric references often cite about 2% to 3%.", "Users may need simplified layouts, repeated vocabulary, caregiver customization, and routine-based communication."],
                        ["Dementia and Alzheimer disease", "WHO estimated more than 57 million people lived with dementia in 2021, with nearly 10 million new cases each year; Alzheimer disease may account for 60% to 70% of cases. The Alzheimer's Association estimated 7.4 million Americans aged 65+ living with Alzheimer dementia in 2026.", "Memory and language changes can make familiar pictures, family names, reminders, and emergency communication very valuable."],
                    ],
                    "widths": [1900, 3800, 3800],
                }
            ],
        },
        {
            "title": "Condition-Specific Communication Needs",
            "paragraphs": [
                "Autistic users may need predictable visual choices, reduced social pressure, and the ability to communicate without being forced into speech. Some autistic people speak fluently in one context but lose access to speech during stress, overload, illness, or unfamiliar situations. VOXI supports both quick single-message output and multi-step sentence building so users can communicate at the level that fits the moment.",
                "Cerebral palsy often affects body movement and sometimes oral-motor control. A person may understand language but have speech that is slow, quiet, or unclear. Large tappable cards, optional audio recordings, and speech synthesis help separate the person's message from motor speech difficulty.",
                "Intellectual disability and dementia require careful cognitive accessibility. VOXI uses categories, familiar icons, repeated routines, and caregiver-controlled content so the screen does not become a wall of choices. For Alzheimer disease and dementia, the value is not only speech output; it is also memory support, family recognition, emergency reassurance, and preserving participation in daily life.",
            ],
        },
        {
            "title": "Life Before Modern AAC",
            "paragraphs": [
                "Before digital AAC became common, many nonspeaking and minimally speaking people depended on no-tech and low-tech strategies. These methods remain important because they are inexpensive and can work without electricity, but they also show why a modern tool such as VOXI is useful.",
            ],
            "bullets": [
                "No-tech communication included facial expressions, gestures, pointing, body movement, eye gaze, vocalizations, and partner interpretation.",
                "Low-tech AAC used printed cards, picture exchange systems, communication boards, alphabet boards, notebooks, laminated pages, Velcro symbol books, and paper-based choice boards.",
                "Caregivers often carried physical cards for food, pain, bathroom, people, medicine, feelings, and places. If the needed word was missing, the user could be misunderstood or left without a way to answer.",
                "Communication boards depended heavily on the communication partner. The partner had to notice the user's selection, read the board correctly, wait long enough, and speak the message aloud.",
                "Paper systems could be lost, damaged, outdated, too bulky, too slow, or difficult to use in emergencies and public places.",
            ],
            "closing": [
                "These tools were valuable because they gave people a voice when speech was unavailable. VOXI builds on the same AAC principle but adds speech, personalization, digital storage, multilingual support, and emergency communication.",
            ],
        },
        {
            "title": "Life After Digital AAC",
            "paragraphs": [
                "Modern AAC changed communication by moving from static paper choices to dynamic, voice-output systems. A digital AAC user can select a symbol and immediately hear the message spoken aloud. This reduces dependence on a partner and makes communication more direct in school, home, therapy, healthcare, and community settings.",
                "VOXI extends this change by combining everyday AAC with practical modules: daily routine tracking, training attempts, emergency messaging, drawing recognition, assistant responses, and offline caching. The app can grow with the user because caregivers can add images, audio, and personalized phrases instead of waiting for a printed board to be redesigned.",
                "The change is not only technical. It affects dignity. A person can say 'I am in pain', 'I need help', 'I am angry because of noise', or 'I want to call my mother' without waiting for someone to guess. Digital AAC also makes it easier to collect repeated needs, notice routines, and support therapy goals over time.",
            ],
        },
        {
            "title": "AAC Design Principles Used in VOXI",
            "paragraphs": [
                "AAC design must respect the user's communication, motor access, language level, and emotional state. VOXI follows the principle that AAC should be available whenever communication is needed, not only during therapy. The interface therefore uses categories, large visual targets, predictable navigation, speech output, and repetition.",
                "A good AAC system balances stability and personalization. Stable layouts help users develop motor memory, while personalization makes vocabulary meaningful. VOXI supports this balance by using fixed main categories with customizable icons, subicons, sub-subicons, uploaded images, personal recordings, and multilingual expressions.",
                "The system also supports aided language modeling. Caregivers and therapists can speak while tapping VOXI symbols, showing the user how the system communicates without forcing imitation. This aligns with AAC best practice: model communication, respond to attempts, and give time for the user to process and choose.",
            ],
        },
        {
            "title": "Market Research and Competitors",
            "paragraphs": [
                "The AAC market includes strong established tools, but many families still face barriers related to price, device platform, language support, customization, and complexity. VOXI is positioned as a web and mobile AAC application focused on accessibility, multilingual support, practical emergency use, and personal vocabulary.",
            ],
            "tables": [
                {
                    "rows": [
                        ["Competitor", "Strengths", "Limitations addressed by VOXI"],
                        ["Proloquo2Go", "Well-known iOS AAC app with symbol vocabulary and customization.", "High cost and iOS focus can limit access; VOXI targets web plus mobile use."],
                        ["CoughDrop", "Cloud AAC platform with cross-device syncing and team support.", "May feel complex for single users; VOXI keeps the core flow simple."],
                        ["TouchChat HD", "Mature AAC app with robust vocabulary options.", "Cost and platform dependence remain barriers for some families."],
                        ["GoTalk NOW", "Useful visual communication boards and audio support.", "VOXI adds web backend, assistant, OCR drawing, emergency messages, and offline caching."],
                    ],
                    "widths": [1900, 3600, 4000],
                }
            ],
            "closing": [
                "VOXI does not claim to replace clinical AAC assessment. Its value is a practical, customizable, multilingual assistive application that can be used by families, students, elderly users, and temporary communication users.",
            ],
        },
        {
            "title": "SWOT Analysis",
            "tables": [
                {
                    "rows": [
                        ["Strengths", "Weaknesses"],
                        ["Multilingual support, web and mobile access, personalized icons, human recordings, AI/browser/Google TTS fallback, emergency messaging, offline mode, and daily routine tracking.", "Initial content library may be smaller than mature commercial apps; caregivers may need time to add custom recordings and images; speech/AI providers depend on configuration."],
                        ["Opportunities", "Threats"],
                        ["Growth in demand for multilingual AAC, teletherapy, school inclusion, elderly care, hospital communication, and low-cost assistive tools. Future versions can expand symbol libraries, analytics, caregiver dashboards, and access methods.", "Established AAC companies, user resistance to new technology, internet limitations, privacy concerns, and the need for clinical validation could affect adoption."],
                    ],
                    "widths": [4700, 4700],
                }
            ],
            "paragraphs": [
                "The SWOT analysis shows that VOXI's strongest contribution is combining AAC communication with practical life features. The main project risk is not the idea itself but the need for careful usability testing with real users and support partners.",
            ],
        },
        {
            "title": "Objectives and SMART Success Criteria",
            "paragraphs": [
                "The main objective is to design and develop VOXI, an AAC application that enables users with communication difficulties to express themselves through icons, text, speech, drawings, emergency messages, and personalized content.",
            ],
            "bullets": [
                "Specific: provide categorized pictograms, multilingual labels, sentence building, speech output, drawing recognition, training, emergency communication, and offline support.",
                "Measurable: allow users to construct basic to intermediate messages with minimal assistance and allow caregivers to add or edit vocabulary and emergency contacts.",
                "Achievable: implement the system using React, Express, PostgreSQL, Prisma, browser APIs, media upload, OCR, and TTS providers within the graduation project timeline.",
                "Relevant: address daily communication challenges for users with autism, cerebral palsy, intellectual disability, dementia, Alzheimer disease, speech delay, and temporary speech loss.",
                "Time-bound: complete design, implementation, testing, deployment preparation, and documentation between February and May as shown in the updated Gantt chart.",
            ],
        },
        {
            "title": "Functional and Non-Functional Requirements",
            "paragraphs": [
                "The functional requirements describe what VOXI must do for the user and caregiver. The non-functional requirements describe how the system should behave: fast, clear, safe, accessible, and maintainable.",
            ],
            "bullets": [
                "Authentication: sign up, log in, store a safe user session, and connect personal features to the user account.",
                "AAC navigation: show main categories, time periods, icons, subicons, sub-subicons, expressions, images, and optional audio.",
                "Speech output: support human recordings, browser speech, ElevenLabs TTS, Google TTS fallback, speed, volume, and voice mode selection.",
                "Customization: allow caregivers to add, edit, delete, upload images, upload audio, record microphone audio, and use URLs for media.",
                "Emergency: save numbers, send urgent text, receive AAC messages, poll inbox, and optionally connect to WhatsApp-style external messaging.",
                "Offline: cache categories, icons, media, and API responses so communication can continue when connection is weak.",
                "Accessibility: use simple screens, large cards, predictable flow, multilingual content, readable contrast, and low cognitive load.",
            ],
        },
        {
            "title": "Development Methodology",
            "paragraphs": [
                "The project follows an iterative methodology. First, requirements were gathered from the AAC problem domain and from expected users: children, adults, elderly users, caregivers, and therapists. Second, the information architecture was designed around communication categories and practical life modules. Third, the database schema and user flows were prepared. Fourth, React screens and Express APIs were implemented and connected to PostgreSQL through Prisma.",
                "The design was refined by adding feature modules gradually: authentication, categories, time periods, icons, subicons, speech, media upload, emergency numbers, messages, drawing recognition, chat assistant, training attempts, daily routine, and offline behavior. This staged approach allowed the app to become usable early while leaving room for richer features.",
                "Documentation was updated after implementation so the report explains both the academic motivation and the actual technical structure. The new diagrams are therefore part of the final system description, not only decorative figures.",
            ],
        },
        {
            "title": "Technology Stack",
            "tables": [
                {
                    "rows": [
                        ["Layer", "Technology", "Purpose"],
                        ["Frontend", "React, React Router, Bootstrap/CSS", "Build interactive screens, routing, forms, cards, modals, and accessible AAC grids."],
                        ["Backend", "Node.js, Express", "Provide API endpoints, validation, file handling, service integration, and business logic."],
                        ["Database", "PostgreSQL with Prisma Client", "Store users, categories, time periods, icons, subicons, sub-subicons, emergency numbers, AAC messages, and speech attempts."],
                        ["Speech and AI", "Browser Speech, ElevenLabs, Google TTS, Groq/OpenAI-compatible provider", "Generate speech, fallback audio, and assistant responses."],
                        ["Recognition", "Tesseract OCR and drawing preprocessing", "Convert drawn or handwritten text/feelings into recognized phrases."],
                        ["Offline", "Service worker, browser cache, localStorage", "Preserve communication data and repeated routines when connection is unavailable."],
                    ],
                    "widths": [1700, 3000, 4800],
                }
            ],
        },
        {
            "title": "System Architecture Narrative",
            "paragraphs": [
                "VOXI is organized as a client-server application. The React frontend handles interaction: selecting cards, navigating categories, building sentences, playing audio, drawing on a canvas, recording speech, and writing messages. The Express backend handles stable data access, authentication, media upload, TTS requests, OCR calls, assistant calls, and database operations.",
                "The architecture separates communication content from presentation. The same database record can store English, Arabic, French, and Spanish titles and expressions. This makes the user interface adaptable without duplicating each icon. Media files are served from public upload paths and can be generated, uploaded, or linked.",
                "Offline support is part of the architecture instead of an afterthought. The frontend can request an offline manifest, cache API responses and media, and use localStorage for daily routine items, training attempts, and icon ordering. If the network fails, VOXI can still present important communication choices.",
            ],
        },
        builder.image_page(
            "Updated Backend and Service Architecture Diagram",
            "architecture_flow",
            "Figure 1. React frontend, service worker, Express backend, Prisma/PostgreSQL, media upload, TTS, chat, OCR, and cache flow.",
            "This diagram replaces the older architecture drawing and shows how the frontend, backend, cache, TTS, chat, OCR, and database components interact.",
        ),
        builder.image_page(
            "Overall User Interaction Flow",
            "overall_flow",
            "Figure 2. Overall VOXI navigation from landing, authentication, main categories, categories, icons, subicons, special modules, and detail pages.",
            "This flow summarizes the user's path through the application. It shows the main communication journey from landing to category selection and detailed message output.",
        ),
        builder.image_page(
            "Main Navigation with Offline Mode",
            "offline_flow",
            "Figure 3. Updated navigation flow including signup, login, offline mode, cached manifest, main categories, special modules, and AAC hierarchy.",
            "This figure adds the offline branch and shows how the user can enter online or offline communication routes.",
        ),
        builder.image_page(
            "Conceptual ERD",
            "conceptual_erd",
            "Figure 4. Conceptual GP ERD view showing high-level entities and relationships.",
            "The conceptual ERD is included as a bridge from the earlier report. The next page contains the final relational table schema used for implementation documentation.",
            max_h=6.4,
        ),
        builder.image_page(
            "Updated Relational Database ERD",
            "relational_erd",
            "Figure 5. Final relational table ERD: MainCategory, TimePeriod, Icon, SubIcon, SubSubIcon, User, EmergencyNumber, AacMessage, and SpeechAttempt.",
            "This is the new relational table image requested for the final report. It replaces the older GP1 database image as the implementation-level schema.",
        ),
        {
            "title": "Database Dictionary and Relationships",
            "paragraphs": [
                "The relational schema is designed around an AAC content hierarchy and personal user features. A MainCategory contains general communication areas, TimePeriod groups daily-life content, Icon represents first-level vocabulary, SubIcon adds more specific options, and SubSubIcon gives deeper detail. User records connect to emergency numbers, AAC messages, and speech attempts.",
            ],
            "tables": [
                {
                    "rows": [
                        ["Table", "Important fields", "Relationship purpose"],
                        ["MainCategory", "id, name, title_en/ar/fr/es, imgUrl", "Top-level category such as real life activities, emergency, training, drawing, chat, and daily routine."],
                        ["TimePeriod", "id, name, titles, imgUrl, order, mainCategoryId", "Groups real-life icons by morning, noon, afternoon, evening, or another daily period."],
                        ["Icon", "titles, expressions, imgUrl, iconName, category, mainCategoryId, timePeriodId", "First communication card that can contain subicons and optional time-period membership."],
                        ["SubIcon", "titles, expressions, imgUrl, category, iconId, audioUrl", "Detailed communication option linked to an icon."],
                        ["SubSubIcon", "titles, expressions, imgUrl, category, subIconId, audioUrl", "Nested detail option for more exact messages."],
                        ["User, EmergencyNumber, AacMessage, SpeechAttempt", "profile, condition, numbers, message sender/receiver, transcript, score", "Personal features: accounts, emergency contacts, messages, and speech practice history."],
                    ],
                    "widths": [1900, 3500, 4000],
                }
            ],
        },
        {
            "title": "Authentication, Profile, and Session Flow",
            "paragraphs": [
                "VOXI uses authentication so personal communication features can belong to a specific user. Signup collects first name, last name, email, password, and condition. Login verifies the user and returns a safe user object for the frontend. The application stores the current session in localStorage so the user does not lose state after a page refresh.",
                "The profile information is important because AAC is personal. The condition field helps the system understand the broad user group while avoiding a one-size-fits-all interface. A child with autism, a person with cerebral palsy, and an older adult with dementia may all use the same app but need different vocabulary, voice settings, and emergency content.",
                "Session state also controls access to the emergency inbox and AAC message page. If the user is not logged in, VOXI prompts for login before showing personal messages or receiver lists. This protects personal content and keeps the workflow clear.",
            ],
        },
        {
            "title": "Main Categories and Time-Based Communication",
            "paragraphs": [
                "The main category screen is the central AAC hub. It opens normal icon categories and special modules. Examples include regular icon communication, real-life activities, emergency, try-and-train-to-speak, express feelings by drawing, AAC assistant, and daily routine.",
                "Real-life activities use time periods to reduce clutter. Instead of showing every daily activity at once, the user can choose a period such as morning, noon, afternoon, or evening. Each period displays the icons most relevant to that time. This supports faster scanning and makes communication feel connected to real life.",
                "The category model also supports future expansion. New categories can be added without rebuilding the whole interface. A school version could add classroom routines; a hospital version could add pain, breathing, nurse, medication, and procedure categories; an elderly-care version could add memories, family, neighbors, and daily reminders.",
            ],
        },
        builder.image_page(
            "Icon, SubIcon, and SubSubIcon User Flow",
            "icons_flow",
            "Figure 6. Detailed icon hierarchy flow including category-specific ordering, subicon and sub-subicon CRUD, media upload, voice modes, and daily routine tracking.",
            "This updated flow explains how the user moves from an icon to subicons and deeper sub-subicons, while caregivers can add or edit content.",
        ),
        {
            "title": "Sentence Builder and Speech Output",
            "paragraphs": [
                "VOXI does not only play isolated words. It builds meaningful expressions from the user's selected category, icon, subicon, sub-subicon, connector, and language. For example, a user can move from a broad food category to a more exact sentence such as 'I want to drink water' or 'I am angry because of noise'.",
                "Speech output is handled through multiple modes. Human Records plays a stored recording when the user or caregiver has uploaded personal audio. Male or Female mode uses browser speech synthesis. AI Male or AI Female can use ElevenLabs TTS. Google TTS is used as a fallback for generated audio in selected flows such as drawing and chat.",
                "Multiple speech paths matter because AAC must be reliable. If a provider fails, a browser voice or stored recording can still communicate the message. Volume and speed controls make the voice easier to understand for different environments, hearing needs, and personal preferences.",
            ],
        },
        {
            "title": "Daily Routine Module",
            "paragraphs": [
                "The daily routine module converts repeated communication into a practical daily list. When the user plays a SubIcon or SubSubIcon three or more times, VOXI can show it in the Daily Routine page. This turns communication history into a simple routine tracker without requiring the caregiver to manually guess what the user repeats often.",
                "Daily Routine reads items from localStorage, groups them by parent title or category, and renders cards with the speak count. The user or caregiver can speak all routine items, speak one item, tap an item to return to the original communication path, remove one routine item, or clear the full routine.",
                "This feature is useful for medication, meals, family contact, sleep, school, therapy, and elderly reminders. It supports independence because repeated needs become easier to find. It also gives caregivers a gentle view of patterns without turning communication into surveillance.",
            ],
        },
        builder.image_page(
            "Daily Routine User Flow",
            "daily_routine_flow",
            "Figure 7. Daily routine flow: item playback tracking, threshold rule, grouping, routine rendering, speaking one/all items, removal, and voice mode.",
            "The diagram shows how repeated spoken items become routine cards and how the user can replay or manage those cards.",
        ),
        {
            "title": "Speech Training Module",
            "paragraphs": [
                "The Try and Train to Speak module helps users practice target words or sentences. The user enters a target, chooses a language, starts recording, and grants microphone permission. The browser speech recognition result is normalized and compared with the target using a Levenshtein-style similarity score.",
                "Attempts are saved locally under training_attempts_v1, allowing the user and caregiver to compare progress across repeated attempts. The module can show pass/retry feedback, transcript, score, progress chart, and attempts table. It also includes practical error states: insecure context, unsupported browser, empty target, offline status, microphone denial, no speech, or recognition error.",
                "This module is not a replacement for speech therapy. It is a practice and feedback tool. Its value is repetition, motivation, and visible progress. It can be used for simple words, functional phrases, and therapy homework while keeping AAC available if speech is not reliable.",
            ],
        },
        builder.image_page(
            "Speech Training User Flow",
            "training_flow",
            "Figure 8. Training module flow: target entry, language choice, microphone permission, Web Speech recognition, transcript scoring, local attempt storage, and progress update.",
            "The flow includes success and failure paths so the training module can respond clearly to browser, network, permission, or recognition problems.",
        ),
        {
            "title": "Drawing OCR and AAC Assistant",
            "paragraphs": [
                "The Express Your Feelings by Drawing page gives users another communication channel. A user can select recognition and TTS language, draw text or a feeling on the canvas, preview it, run OCR, edit the recognized phrase, and speak the result. The backend preprocesses the PNG and recognizes text using Tesseract OCR with English or Arabic trained data.",
                "The AAC Assistant gives guided responses. The user chooses an assistant language, taps a quick prompt or writes an AAC question, and sends it to the backend. If a provider such as Groq is configured, the system can call an OpenAI-compatible chat API. If not, it can match a local AAC response dataset and return a default or clarifying reply.",
                "Together, drawing and chat support users who may not find the right icon immediately. A user can draw, write, or ask for help. The assistant is especially useful for caregivers because it can explain AAC strategies, modeling, refusal, school support, and home routines.",
            ],
        },
        builder.image_page(
            "Drawing and Chat Assistant Flow",
            "drawing_chat_flow",
            "Figure 9. Drawing/OCR and chat assistant flow including canvas input, OCR preprocessing, TTS playback, assistant language, local/Groq provider decision, and reply audio.",
            "This diagram merges two advanced expression features: drawing-based communication and AAC assistant support.",
        ),
        {
            "title": "Emergency System and AAC Messaging",
            "paragraphs": [
                "Emergency communication is a critical AAC requirement. A user who cannot speak must still be able to ask for help, contact a caregiver, send urgent text, and receive messages. VOXI includes an Emergency page, emergency numbers, urgent message sending, AAC message page, personal inbox polling, and optional WhatsApp-style integration.",
                "The emergency numbers feature stores phone numbers with optional labels in English, Arabic, French, and Spanish. The user can choose a saved number, write urgent text, and open a WhatsApp phone URL with the message. The AAC message feature lets logged-in users choose another user account, write or append a quick AAC phrase, preview the receiver text, speak the preview, and store the message.",
                "The inbox checks for new messages and can speak new messages if Auto Speak is enabled. This helps users who cannot read quickly or who need auditory confirmation. The system also normalizes external webhook payloads so future Twilio, Meta, or generic integrations can save incoming replies as AAC messages.",
            ],
        },
        builder.image_page(
            "Emergency and AAC Message User Flow",
            "emergency_flow",
            "Figure 10. Emergency page flow: login state, inbox polling, auto speak, emergency numbers, urgent WhatsApp message, AAC receiver selection, preview, send, webhook reply, and storage.",
            "This updated diagram replaces the older emergency workflow and captures both sending and receiving communication.",
        ),
        {
            "title": "Offline Mode and Cache Strategy",
            "paragraphs": [
                "AAC should not stop working because the network fails. VOXI therefore includes offline mode, service-worker caching, a syncOfflineCache function, browser cache storage, localStorage routines, and cached API/media lists. When the user enables offline mode, the app can fetch an offline manifest and build cached responses for categories, icons, audio, and media.",
                "The frontend uses cachedFetch logic to decide whether the app is offline or the connection is unavailable. If offline, it reads cached responses and media where possible. If online, it can refresh the cache. This is especially important for school, transportation, hospitals, or low-connectivity homes.",
                "LocalStorage complements cache storage. It keeps loggedInUser, offline-mode preference, daily_routine_items_v1, training_attempts_v1, and icon ordering. These local records let the app preserve user progress even when the backend is temporarily unreachable.",
            ],
        },
        builder.image_page(
            "Updated Project Gantt Chart",
            "gantt",
            "Figure 11. Smart Assistive Application Project Gantt Chart, February to May.",
            "The new Gantt chart replaces the older timeline figure and shows the staged implementation schedule from planning through testing and final documentation.",
            max_h=7.5,
        ),
        {
            "title": "Project Timeline Explanation",
            "paragraphs": [
                "The project timeline begins with planning and requirements analysis in February, followed by UI/UX design for accessibility and patient flexibility. Authentication, landing pages, and database/backend foundations are started early because the rest of the application depends on them.",
                "Dataset collection runs across much of the schedule because the app needs more than code; it needs understandable images, audio URLs, icon categories, and personalized AAC content. After the schema and dataset work, the team develops custom icons, subicons, sub-subicons, upload features, smart categorization, time-based interface, speech-to-text, TTS, multilingual fields, and voice controls.",
                "Later stages focus on richer assistive modules: user voice recording, reminders, emergency messaging, OCR drawing, magnification, speech learning, AI assistant responses, offline mode, deployment, VPS/APK/mobile installation, bug fixing, performance, and final documentation. The timeline shows overlapping work because frontend, backend, data, and documentation evolved together.",
            ],
        },
        {
            "title": "UI/UX and Accessibility Design",
            "paragraphs": [
                "VOXI's user interface is designed for scanning and repeated use. AAC users may have motor delays, sensory overload, low literacy, memory difficulty, or limited attention. The interface therefore uses large visual cards, simple category routes, clear labels, predictable buttons, and repeated layouts.",
                "The design avoids forcing the user through too many text-heavy screens. Categories organize options, time periods reduce the number of visible choices, and detail pages allow deeper expression when needed. The same concept appears across modules: select, preview, speak, save, or send.",
                "Accessibility also means emotional accessibility. Users should not feel tested every time they communicate. VOXI supports quick messages, human recordings, personalized images, assistant guidance, drawing, and emergency phrases so the user can communicate even when tired, anxious, overloaded, or unable to type.",
            ],
        },
        {
            "title": "Mobile Application Implementation",
            "paragraphs": [
                "The mobile version follows the same communication logic as the web application: sign up, login, profile, settings, main categories, real-life activities, reminder/family categories, subcategory navigation, dynamic sentence generation, search, favorites, multilingual output, and speech volume/speed controls.",
                "A mobile interface is important because AAC must travel with the user. Communication happens in homes, schools, clinics, buses, streets, shops, hospitals, and family visits. Mobile support makes VOXI closer to a practical assistive device rather than a desktop-only project.",
                "The mobile implementation also reinforces the need for offline behavior. A phone may lose data connection, but the user still needs core vocabulary. The shared concepts between web and mobile help maintain the same mental model: main category, icon, subicon, sentence, speech, and routine.",
            ],
        },
        {
            "title": "Security, Privacy, and Data Management",
            "paragraphs": [
                "VOXI handles sensitive data: names, email addresses, condition categories, emergency numbers, personal messages, voice recordings, uploaded images, and speech attempts. Security and privacy therefore matter even in a graduation project prototype.",
                "The backend keeps database access, password handling, media upload rules, and external API keys away from the frontend. Authentication protects personal inbox and account-specific workflows. In future production versions, the system should add stronger session tokens, role-based caregiver permissions, encrypted transport, rate limiting, audit logs, file validation, backup policy, and clear consent screens for recordings and AI requests.",
                "Data management should also respect AAC dignity. Logs and analytics must be used to support communication, not to judge the user. Routine counts and training attempts should be visible to caregivers only when useful and should be explainable, editable, and removable.",
            ],
        },
        {
            "title": "Testing and Preliminary Results",
            "paragraphs": [
                "Testing focused on whether the main communication paths work end to end. The core result is that the user can open VOXI, navigate categories, select icons and subicons, generate expressions, play speech, manage routine items, add emergency numbers, send messages, run drawing recognition, receive assistant replies, and practice target speech.",
            ],
            "tables": [
                {
                    "rows": [
                        ["Test area", "Expected behavior", "Result"],
                        ["Authentication", "User can sign up, log in, and preserve session state.", "Implemented and documented."],
                        ["AAC hierarchy", "MainCategory -> TimePeriod/Icon -> SubIcon -> SubSubIcon displays correct choices.", "Implemented with relational schema and updated flow."],
                        ["Speech output", "Stored audio, browser speech, AI TTS, and fallback paths can produce audio.", "Implemented with multiple voice modes."],
                        ["Emergency", "Save number, write urgent message, send/receive AAC message, speak inbox.", "Implemented in workflow and report."],
                        ["Offline", "Cache key content and preserve local routine/training data.", "Implemented conceptually with cache/localStorage flow."],
                        ["Training and OCR", "Record speech attempts and recognize drawing text for speech output.", "Implemented as assistive modules."],
                    ],
                    "widths": [2200, 4100, 3100],
                }
            ],
        },
        {
            "title": "Challenges, Limitations, and Future Work",
            "paragraphs": [
                "The main challenge is that AAC is highly individual. A layout that works for one user may not work for another. VOXI therefore needs real usability testing with users, families, and speech-language professionals. Testing should include children, adults, elderly users, users with motor impairments, Arabic-speaking families, and temporary hospital communication scenarios.",
                "Technical challenges include provider failures, inconsistent browser speech APIs, microphone permissions, OCR accuracy on messy drawings, media file sizes, offline cache freshness, and safe handling of personal recordings. The report diagrams show fallback paths because reliability is more important than a single impressive feature.",
                "Future work should add caregiver dashboards, therapist accounts, more languages, larger symbol libraries, switch scanning, eye-gaze compatibility, better analytics, cloud sync, stronger authentication, encrypted messaging, hospital quick boards, clinical validation, and a controlled user study measuring message success rate, time to communicate, caregiver satisfaction, and perceived independence.",
            ],
        },
        {
            "title": "Conclusion and References",
            "paragraphs": [
                "VOXI is a smart AAC application that combines visual communication, multilingual speech output, personalized media, emergency messaging, speech practice, drawing recognition, assistant support, daily routine tracking, and offline behavior. The final merged report replaces the older GP1 visuals with the updated relational ERD, user-flow diagrams, architecture diagram, and Gantt chart, while adding clearer background statistics and AAC history.",
                "The project demonstrates how modern web and mobile technologies can support people who cannot rely on natural speech. Its strongest value is practical communication: helping the user express needs, emotions, choices, emergencies, and routines with dignity.",
                "References: [1] CDC Autism Data and Statistics, https://www.cdc.gov/autism/data-research/index.html. [2] WHO Autism fact sheet, https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders. [3] CDC Cerebral Palsy Data and Statistics archive, https://archive.cdc.gov/www_cdc_gov/ncbddd/cp/data.html. [4] WHO Dementia fact sheet, https://www.who.int/news-room/fact-sheets/detail/dementia. [5] Alzheimer's Association Facts and Figures, https://www.alz.org/alzheimers-dementia/facts-figures. [6] ASHA AAC Practice Portal, https://www.asha.org/Practice-Portal/Professional-Issues/Augmentative-and-Alternative-Communication/. [7] CDC/NCHS Developmental Disabilities Data Brief 473, https://www.cdc.gov/nchs/products/databriefs/db473.htm. [8] NICHD Intellectual and Developmental Disabilities, https://www.nichd.nih.gov/health/topics/idds. [9] Beukelman and Mirenda AAC textbook summary via NCBI Bookshelf, https://www.ncbi.nlm.nih.gov/books/NBK453284/. [10] ARASAAC pictogram portal, https://arasaac.org/. [11] AssistiveWare Proloquo2Go, https://www.assistiveware.com/products/proloquo2go. [12] Project source documents: GP1.docx and Voxi_App_Detailed_Features_Report_A4_UPDATED.doc.",
            ],
        },
    ]
    return pages


def main() -> None:
    missing = [str(path) for path in IMAGES.values() if not path.exists()]
    if missing:
        raise FileNotFoundError("Missing image files:\n" + "\n".join(missing))
    builder = DocxBuilder()
    pages = make_pages(builder)
    assert len(pages) == 45, f"Expected 45 pages, got {len(pages)}"
    builder.write(pages)
    print(OUT.resolve())


if __name__ == "__main__":
    main()
