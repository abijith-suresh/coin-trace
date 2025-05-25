import * as dotenv from 'dotenv';
dotenv.config();

import { addUserCryptocurrency, deleteUserCryptocurrency, getUserCryptocurrencies, updateUserCryptocurrency } from '@/db';
import { nanoid } from 'nanoid';

async function testDatabase() {
  try {
    // Test user ID
    const testUserId = 'test-user-' + nanoid();

    console.log('Testing database operations...');

    // Test adding a cryptocurrency
    console.log('\n1. Adding a cryptocurrency...');
    const newCrypto = await addUserCryptocurrency({
      id: nanoid(),
      userId: testUserId,
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: '1.5',
    });
    console.log('Added cryptocurrency:', newCrypto);

    // Test getting cryptocurrencies
    console.log('\n2. Getting user cryptocurrencies...');
    const userCryptos = await getUserCryptocurrencies(testUserId);
    console.log('User cryptocurrencies:', userCryptos);

    // Test updating a cryptocurrency
    console.log('\n3. Updating cryptocurrency...');
    const updatedCrypto = await updateUserCryptocurrency(newCrypto[0].id, {
      amount: '2.0',
    });
    console.log('Updated cryptocurrency:', updatedCrypto);

    // Test deleting a cryptocurrency
    console.log('\n4. Deleting cryptocurrency...');
    const deletedCrypto = await deleteUserCryptocurrency(newCrypto[0].id);
    console.log('Deleted cryptocurrency:', deletedCrypto);

    console.log('\nAll database operations completed successfully!');
  } catch (error) {
    console.error('Error testing database:', error);
  }
}

// Run the test
testDatabase();