---
title: "Building BanglaLLM: Training a Language Model from Scratch"
date: 2026-04-18
cover:
tags: NLP, Machine Learning, Research, Python
excerpt: Why I trained a 100M parameter transformer specifically for Bangla, what broke along the way, and what I learned about tokenisation, data quality, and the gap between "it runs" and "it works".
draft: true
---

Most large language models treat Bangla as an afterthought. It shows — outputs are stilted, romanised words slip in mid-sentence, and the models clearly haven't seen enough natural Bangla to develop any real fluency. That frustration is what started BanglaLLM.

## The Tokeniser Problem

The first thing I underestimated was tokenisation. Most multilingual models use BPE tokenisers trained predominantly on English, which means a single Bangla word often fragments into 6–10 tokens. This is both inefficient and actively harmful for generation quality — the model has to "think" in chunks that don't correspond to meaningful linguistic units.

I trained a custom tokeniser from scratch on a Bangla corpus with a **16,000 token vocabulary**. The difference was immediately visible: Bangla words that were previously split into 8 tokens now resolved to 1 or 2. This alone improved generation coherence noticeably before I'd changed anything else.

## Data is Everything (and Cleaning it is Miserable)

I scraped and compiled text from Bangla Wikipedia, Prothom Alo archives, and several public datasets. Raw total: roughly 4.2GB of text. After deduplication, boilerplate removal, and filtering out mixed-script noise, that dropped to around 2.8GB — cleaner, but smaller than I wanted.

> The single most time-consuming part of this project wasn't the model training. It was sitting in a Jupyter notebook at 2am removing HTML artifacts and deciding whether a given sentence was "clean enough" to keep.

## Architecture and Training

The model is a standard decoder-only transformer — 12 layers, 768 hidden dimensions, 12 attention heads — totalling around **100 million parameters**. Nothing exotic. I deliberately kept the architecture conventional so that the variable I was actually testing was the data and tokeniser, not the model design.

Training ran on a single A100 (Colab Pro+) over several sessions. Total compute was somewhere around 80 GPU-hours. Loss converged well but I hit a frustrating plateau around epoch 6 that took me two weeks to diagnose — turned out to be a learning rate schedule bug that was silently zeroing the LR too early.

## What I'd Do Differently

- Start with a larger, cleaner corpus — 2.8GB is genuinely not enough for a 100M model
- Instrument training more carefully from day one; the LR bug cost me weeks
- Add evaluation benchmarks earlier — I was relying on vibes for too long

The demo is live at [demobanglallm.streamlit.app](https://demobanglallm.streamlit.app/) if you want to try it. It's imperfect, but it's genuinely generating coherent Bangla — and that felt like something worth shipping.
