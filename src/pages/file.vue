<script setup>
const fileOptions = {
	dataType: 'ArrayBuffer',
	acceptAllTypes: true,
	multiple: false,
}
const fileAPI = useFileSystemAccess(fileOptions)
const { copy, copied } = useClipboard()

const fileName = ref('')
const password = ref('')
const fileHash = reactive({})
const hashState = ref(0)
const fileOpen = ref(false)

function closeFile() {
	fileAPI.file.value = null
	fileAPI.data.value = null
	fileName.value = ''
	password.value = ''
	hashState.value = 0
}

async function saveFile() {
	fileAPI.saveAs({
		suggestedName: fileName.value || fileAPI.fileName.value,
	})
}

async function encryptFile() {
	const passwd = password.value
	if (!passwd)
		return saveFile()

	const plaintext = new TextDecoder('utf-8').decode(fileAPI.data.value)
	const data = JSON.stringify(plaintext)
	fileAPI.data.value = await cryptoEncrypt(data, password.value)
	fileAPI.saveAs({
		suggestedName: fileAPI.fileName.value + '.enc',
		types: [
			{
				description: 'Encrypted file',
				accept: {
					'text/plain': ['.enc'],
				},
			},
		],
	})
}

async function decryptFile() {
	fileOpen.value = false
	const passwd = password.value
	if (!passwd) {
		fileOpen.value = true
		return fileAPI.open()
	}

	await fileAPI.open({
		types: [
			{
				description: 'Encrypted file',
				accept: {
					'text/plain': ['.enc'],
				},
			},
		],
	})

	try {
		const decryptData = await cryptoDecrypt(fileAPI.data.value, passwd)
		fileAPI.data.value = JSON.parse(decryptData)
		password.value = ''
		const name = fileAPI.fileName.value
		if (name.endsWith('.enc'))
			fileName.value = name.slice(0, name.length - 4)
		else
			fileName.value = fileName + '.dec'
		fileOpen.value = true
	} catch (err) {
		fileAPI.data.value = null
		console.error(err)
	}
}

async function getHashes() {
	hashState.value = 1
	if (!fileAPI.data.value)
		return

	const hashes = {}
	hashes.sha1 = await cryptoHash('SHA-1', fileAPI.data.value)
	hashes.sha256 = await cryptoHash('SHA-256', fileAPI.data.value)
	hashes.sha384 = await cryptoHash('SHA-384', fileAPI.data.value)
	hashes.sha512 = await cryptoHash('SHA-512', fileAPI.data.value)
	Object.assign(fileHash, hashes)
	hashState.value = 2
}
</script>

<template>
	<h1>File encryptor / checker</h1>
	<div v-if="fileAPI.isSupported" :class="$style.file">
		<div v-if="!fileAPI.data.value || !fileOpen">
			<div :class="$style.file">
				<BaseButton @click="decryptFile">
					{{ password.length ? 'Decrypt' : 'Open' }} file
				</BaseButton>
			</div>
		</div>
		<div v-else :class="$style.base">
			<div>
				<div :class="$style.file">
					<BaseButton @click="encryptFile">
						{{ password.length ? 'Encrypt' : 'Save' }} file
					</BaseButton>
				</div>
				<div :class="$style.info">
					<h2>File</h2>
					<p>Name: {{ fileName || fileAPI.fileName.value }}</p>
					<p>Size: {{ fileAPI.fileSize.value }}</p>
					<p v-if="fileAPI.fileMIME.value">Media Type: {{ fileAPI.fileMIME.value }}</p>
					<p v-if="fileAPI.fileLastModified.value">Last Modified: {{ new Date(fileAPI.fileLastModified.value) }}
					</p>
					<div :class="$style.hash">
						<BaseButton v-if="hashState === 0" @click="getHashes">
							Calculate hashes
						</BaseButton>
						<template v-else-if="hashState === 1">
							<p>Calculating hashes...</p>
						</template>
						<template v-else>
							<h3>Hashes:</h3>
							<ul>
								<li v-for="hash of Object.keys(fileHash)" :key="fileHash[hash]">
									<p>{{ hash }}: <code @click="copy(fileHash[hash])">{{ fileHash[hash] }}</code></p>
								</li>
							</ul>
							<div v-if="copied" :class="$style.copied">
								<p>Copied to clipboard!</p>
							</div>
						</template>
					</div>
				</div>
				<BaseButton @click="closeFile" :class="$style.closefile">
					Close File
				</BaseButton>
			</div>
		</div>
		<div>
			<input v-model="password" type="password" placeholder="Password" />
		</div>
	</div>
	<div v-else>
		<p>File System Access API is not supported</p>
	</div>
</template>

<style module>
.file {
	display: flex;
	flex-direction: row;
	gap: 12px;
}

.hash {
	max-width: 250px;
}

.hash code {
	cursor: pointer;
	font-size: 12px;
}

.hash ul {
	text-transform: uppercase;
}

.base {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.info {
	margin-top: 10px;
}

.info p {
	margin: 0px;
}

.openfile {
	margin-top: 12px;
}

.closefile {
	margin-top: 12px;
	background-color: rgba(255, 0, 0, 0.452);
}

.closefile:hover {
	background-color: rgba(255, 0, 0, 0.6);
}

.copied {
	background-color: rgb(29, 94, 180);
	padding: 4px;
	font-size: 12px;
	width: fit-content;
	border-radius: 5px;
}
</style>