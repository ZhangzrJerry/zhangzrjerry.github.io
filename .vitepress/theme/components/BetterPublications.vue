<template>
    <div class="publications">
        <div v-for="(publication, idx) in publications" :key="idx" class="publication">
            <PublicationItem :publication="publication" />
            <img :src="publication.image" alt="Publication image" class="publication-image" />
            <div class="publication-content">
                <h2 class="publication-title">{{ publication.title }}</h2>
                <div class="publication-venue">
                    <div v-if="Array.isArray(publication.venue)">
                        <span v-for="(venue, idx) in publication.venue" :key="idx">
                            <span v-html="highlight(venue.toString())"></span>
                            <br v-if="idx < publication.venue.length - 1" />
                        </span>
                    </div>
                    <div v-else v-html="highlight(publication.venue)"></div>
                </div>
                <div class="publication-authors">
                    <span v-for="(author, idx) in publication.authors" :key="idx">
                        <span v-if="author.includes('==')" v-html="highlight(author)"></span>
                        <span v-else>{{ author }}</span>
                        <span v-if="idx < publication.authors.length - 1">, </span>
                    </span>
                </div>
                <div class="publication-links">
                    <a v-for="(link, idx) in publication.links" :key="idx" :href="link.url" target="_blank"
                        rel="noopener">
                        [{{ link.label }}]
                    </a>
                </div>
                <div class="publication-details">{{ publication.details }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Publication } from '../../type'

defineProps<{
    publications: Publication[]
}>()

function highlight(inner: string): string {
    return inner.replace(/\=\=(.*?)\=\=/g, '<span class="highlight">$1</span>');
}
</script>

<style scoped>
.publication {
    display: flex;
    margin-bottom: 2rem;
    align-items: flex-start;
}

.publication-image {
    margin-top: 0.22em;
    margin-right: 0.75rem;
    width: 27.5%;
    object-fit: cover;
    border-radius: 8px;
}

@media (max-width: 768px) {
    .publication-image {
        width: 22.5%;
    }
}

.publication-content {
    flex: 1;
}

.publication-title {
    border: none;
    margin: 0 !important;
    padding: 0 !important;
    font-size: 1.2rem;
    line-height: 1.35rem;
    font-weight: bold;
}

@media (max-width: 768px) {
    .publication-title {
        font-size: 1.1rem;
    }
}

.publication-venue {
    color: #888;
    margin-top: 0.4rem;
    line-height: 1rem;
}

.publication-authors {
    margin-top: 0.4rem;
    line-height: 1rem;
    font-size: 0.95rem;
}

.publication-links {
    margin-top: 0.5rem;
    line-height: 1rem;
}

.publication-links a {
    margin-right: 0.5rem;
    font-size: 0.95rem;
    color: #2e80f2;
}

.publication-links a:hover {
    color: #0040af;
}

.publication-details {
    font-size: 0.95rem;
    margin-top: 0.4rem;
    line-height: 1.2rem;
}
</style>

<style>
.publication-venue .highlight {
    font-weight: bold;
    color: #ff82b2;
    font-style: italic;
}

.publication-authors .highlight {
    font-weight: bold;
    text-decoration: underline;
}
</style>