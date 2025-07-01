import streamlit as st
import fitz  # PyMuPDF
from io import BytesIO
import os

st.set_page_config(page_title="Kreiranje treninga", layout="centered")
st.title("Kreiranje treninga")

# Korisnički unosi
datum = st.date_input("Datum").strftime("%d.%m.%Y.")
kategorija = st.selectbox(
    "Kategorija",
    [" ", "Škola košarke", "U12", "U14", "U16", "SEN"]
)
broj_treninga = st.number_input("Broj treninga", step=1, min_value=1)
broj_igraca = st.number_input("Broj igrača na treningu", step=1, min_value=1)
uvod = st.text_area("Uvod")
glavni_dio = st.text_area("Glavni dio")
zavrsni_dio = st.text_area("Završni dio")

if st.button("Generiraj PDF"):
    template_path = "spranca.pdf"
    font_path = "DejaVuSans.ttf"  # Font mora biti u istom folderu!

    if not os.path.isfile(font_path):
        st.error("Nedostaje font 'DejaVuSans.ttf'. Dodaj ga u direktorij aplikacije.")
    elif not os.path.isfile(template_path):
        st.error("Nedostaje špranca 'spranca.pdf'.")
    else:
        doc = fitz.open(template_path)
        page = doc[0]

        fs_title = 18
        fs_text = 14

        # Dodavanje teksta s podrškom za č, ć, ž, š, đ
        page.insert_textbox(fitz.Rect(110, 25, 400, 60), f"{kategorija}", fontsize=fs_title, fontfile=font_path)
        page.insert_textbox(fitz.Rect(110, 55, 300, 80), f"{datum}", fontsize=fs_text, fontfile=font_path)
        page.insert_textbox(fitz.Rect(540, 25, 600, 50), f"{broj_treninga}", fontsize=fs_text, fontfile=font_path)
        page.insert_textbox(fitz.Rect(540, 55, 600, 80), f"{broj_igraca}", fontsize=fs_text, fontfile=font_path)

        page.insert_textbox(fitz.Rect(230, 165, 500, 320), uvod, fontsize=fs_text, fontfile=font_path)
        page.insert_textbox(fitz.Rect(230, 325, 500, 550), glavni_dio, fontsize=fs_text, fontfile=font_path)
        page.insert_textbox(fitz.Rect(230, 570, 500, 750), zavrsni_dio, fontsize=fs_text, fontfile=font_path)

        # Spremanje u memoriju
        output_pdf = BytesIO()
        doc.save(output_pdf)
        doc.close()
        output_pdf.seek(0)

        # Preuzimanje
        st.success("PDF je generiran!")
        st.download_button("Preuzmi PDF", output_pdf, file_name="generirani_izlaz.pdf", mime="application/pdf")
