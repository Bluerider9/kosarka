import streamlit as st
import fitz  # PyMuPDF
from io import BytesIO
import os

st.set_page_config(page_title="Kreiranje treninga", layout="centered")
st.title("Kreiranje treninga")

# Korisnički unosi
datum = st.date_input("Datum").strftime("%d.%m.%Y.")
kategorija = st.selectbox("Kategorija", [" ", "Škola košarke", "U12", "U14", "U16", "SEN"])
broj_treninga = st.number_input("Broj treninga", step=1, min_value=1)
broj_igraca = st.number_input("Broj igrača na treningu", step=1, min_value=1)
uvod = st.text_area("Uvod")
glavni_dio = st.text_area("Glavni dio")
zavrsni_dio = st.text_area("Završni dio")

if st.button("Generiraj PDF"):
    template_path = "spranca.pdf"
    font_path = "Roboto.ttf"

    # Provjera postoje li datoteke
    if not os.path.exists(template_path) or not os.path.exists(font_path):
        st.error(f"Greška: Provjerite da li datoteke '{template_path}' i '{font_path}' postoje u direktoriju.")
    else:
        doc = fitz.open(template_path)
        page = doc[0]

        # ISPRAVAN NAČIN za učitavanje fonta (na stranici, ne dokumentu)
        doc.insert_font(fontfile=font_path, fontname="roboto")

        fs_title = 18
        fs_text = 14
        
        # Korištenje boljeg fonta
        font_to_use = "roboto"

        page.insert_textbox(fitz.Rect(110, 60, 300, 90), datum, fontsize=fs_text, fontname=font_to_use, align=fitz.TEXT_ALIGN_LEFT)
        page.insert_textbox(fitz.Rect(110, 20, 400, 60), kategorija, fontsize=fs_title, fontname=font_to_use, align=fitz.TEXT_ALIGN_LEFT)

        # Za brojeve je bolje koristiti centralno ili desno poravnanje
        page.insert_textbox(fitz.Rect(540, 20, 600, 60), str(broj_treninga), fontsize=fs_text, fontname=font_to_use, align=fitz.TEXT_ALIGN_CENTER)
        page.insert_textbox(fitz.Rect(540, 60, 600, 100), str(broj_igraca), fontsize=fs_text, fontname=font_to_use, align=fitz.TEXT_ALIGN_CENTER)

        # Za duge tekstove, lijevo ili obostrano poravnanje je najbolje
        page.insert_textbox(fitz.Rect(230, 165, 550, 250), uvod, fontsize=fs_text, fontname=font_to_use, align=fitz.TEXT_ALIGN_LEFT)
        page.insert_textbox(fitz.Rect(230, 325, 550, 450), glavni_dio, fontsize=fs_text, fontname=font_to_use, align=fitz.TEXT_ALIGN_LEFT)
        page.insert_textbox(fitz.Rect(230, 570, 550, 700), zavrsni_dio, fontsize=fs_text, fontname=font_to_use, align=fitz.TEXT_ALIGN_LEFT)

        output_pdf = BytesIO()
        doc.save(output_pdf)
        doc.close()
        output_pdf.seek(0)

        st.success("PDF je generiran!")
        st.download_button("Preuzmi PDF", output_pdf, file_name="trening.pdf", mime="application/pdf")
